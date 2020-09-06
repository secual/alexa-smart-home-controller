import * as Discovery from './discovery';
import * as Device from './device';
import { IUserDevice } from './device';

interface SmartHomeControllerConstructorParam {
  event: any;
  devices?: IUserDevice[];
  discoveryFunction?: Discovery.DiscoveryFunction;
}
/**
 * Main Controller
 */
class SmartHomeController {
  private event: any;
  private discoveryFunction?: Discovery.DiscoveryFunction;
  private devicePool: IUserDevice[] = [];

  /**
   * @param param SmartHomeControllerConstructorParam
   */
  constructor(param: SmartHomeControllerConstructorParam) {
    this.event = param.event;
    this.devicePool = param.devices ?? [];
    this.discoveryFunction = param.discoveryFunction ?? undefined;
  }

  /**
   * main logic
   */
  public async run(): Promise<Discovery.Response | Device.Response> {
    let device: IUserDevice | undefined = undefined;

    try {
      console.log('[ASHC]:RequestFromAlexa:Directive', this.event.directive);
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
        const responseHeader: Discovery.Header = Object.assign({}, header);
        responseHeader.name = 'Discover.Response';

        if (this.discoveryFunction) {
          // Search from DeviceCloud
          const endpoints = await this.discoveryFunction(this.event);

          console.log(
            '[ASHC]:Discovery:Response',
            JSON.stringify({ header, endpoints })
          );
          return {
            event: {
              header: responseHeader,
              payload: {
                endpoints,
              },
            },
          };
        }

        if (this.devicePool.length > 0) {
          const endpoints = this.devicePool.map(
            (d): Discovery.Endpoint => {
              if (d.buildEndpoint) {
                return d.buildEndpoint();
              }
              console.log(
                `[ASHC]: Required method the buildEndpoint does not exist`
              );
              throw Error('Requirement Error');
            }
          );
          return {
            event: {
              header: responseHeader,
              payload: {
                endpoints,
              },
            },
          };
        }
        return this.getGeneralErrorResponse();
      }

      // get device for requesting the device cloud

      if (this.devicePool) {
        console.log('[ASHC]: Search from devicePool');
        device = this.devicePool.find((d): boolean => {
          let result =
            d.getEndpointId() === this.event.directive.endpoint.endpointId;
          if (result) {
            console.log(`[ASHC]: device matched as endpointId`);
            return result;
          }
          result = d.matcher ? d.matcher(this.event) : result;
          if (result) console.log(`[ASHC]: device matched as matcher function`);
          return result;
        });
      }

      console.log('[ASHC]:Controller:Target Device', typeof device?.sendSignal);
      if (device) {
        const response = await device.sendSignal();
        console.log('[ASHC]:Controller:Response', response);
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
