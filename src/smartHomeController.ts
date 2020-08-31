import * as Discovery from './discovery';
import * as Device from './device';
import { IUserDevice } from './device';

interface SmartHomeControllerConstructorParam {
  event: any;
  discoverFunction?: Discovery.DiscoveryFunction;
  deviceSearchFunction?: Device.DeviceSearchFunction;
  devices?: IUserDevice[];
}
/**
 * Main Controller
 */
class SmartHomeController {
  private event: any;
  private discoveryFunction?: Discovery.DiscoveryFunction;
  private deviceSearchFunction?: Device.DeviceSearchFunction;
  private devicePool: IUserDevice[] = [];

  /**
   * @param param SmartHomeControllerConstructorParam
   */
  constructor(param: SmartHomeControllerConstructorParam) {
    this.event = param.event;
    this.discoveryFunction = param.discoverFunction ?? undefined;
    this.deviceSearchFunction = param.deviceSearchFunction ?? undefined;
    this.devicePool = param.devices ?? [];
  }

  /**
   * main logic
   */
  public async run(): Promise<Discovery.Response | Device.Response> {
    let device: IUserDevice | undefined = undefined;

    try {
      console.log('[ASSHC]:RequestFromAlexa:Directive', this.event.directive);
      const header: Discovery.Header | Device.Header = this.event.directive
        .header;

      /**
       * discovery
       */
      if (
        header.namespace === 'Alexa.Discovery' &&
        header.name === 'Discover'
      ) {
        console.log('Discover event', this.event);
        header.name = 'Discover.Response';

        if (this.devicePool.length > 0) {
          return {
            event: {
              header,
              payload: {
                endpoints: this.devicePool.map(d => d.buildEndpoint()),
              },
            },
          };
        }

        if (this.discoveryFunction) {
          // Search from DeviceCloud
          const endpoints: Discovery.Endpoint[] = await this.discoveryFunction(
            this.event
          );
          const payload = {
            endpoints: endpoints,
          };
          console.log(
            '[ASSHC]:Discovery:Response',
            JSON.stringify({ header, payload })
          );
          return {
            event: {
              header,
              payload,
            },
          };
        }
        return this.getGeneralErrorResponse();
      }

      // get device for requesting the device cloud

      if (this.devicePool) {
        device = this.devicePool.find(
          d => d.getEndpointId() === this.event.directive.endpoint.endpointId
        );
      } else if (this.deviceSearchFunction) {
        device = await this.deviceSearchFunction(this.event);
        if (!device) throw new Error('error');
      }

      console.log('[ASSHC]:Controller:Target Device', device);
      if (device) {
        // send signal
        const response = await device.sendSignal();
        console.log('[ASSHC]:Controller:Response', response);
        return response;
      }
      return this.getGeneralErrorResponse();
    } catch (e) {
      console.log(e);
      return this.getGeneralErrorResponse(device);
    }
  }

  /**
   * Get generally error response
   * @param device user device object
   * (will be undefined if this object does not find by the device search function)
   */
  private getGeneralErrorResponse(device?: IUserDevice): Device.Response {
    return {
      event: {
        header: {
          namespace: 'Alexa',
          name: 'ErrorResponse',
          messageId: this.event.directive.header.messageId + '-R',
          payloadVersion: '3',
          correlationToken: this.event.directive.header.correlationToken,
        },
        endpoint: {
          endpointId: device ? device.getEndpointId() : 'NO_ENDPOINT_ID',
        },
        payload: {
          type: 'INTERNAL_ERROR',
          message: 'There is a problem when doing device action',
        },
      },
    };
  }
}

export default SmartHomeController;
