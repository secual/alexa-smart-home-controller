import { ResponseName, ControllerErrorResponseType } from '../namespace';

import * as Device from './index';
import { ControllerRequestEvent } from './type';

/**
 * DeviceSearchFunction is a logic of finding a target device from Alexa's controller Request.
 * SmartHomeController class requires this function on the Constructor.
 */
export type DeviceSearchFunction = (
  event: Device.ControllerRequestEvent
) => Promise<Device.IUserDevice>;

/**
 * Device interface
 * sendSignal method is called automatically
 */
export interface IUserDevice {
  getEndpointId(): string;
  sendSignal(): Promise<Device.Response>;
}

/**
 * Parameter of constructor UserDevice class
 */
export interface UserDeviceParam {
  event: ControllerRequestEvent;
  isAsyncResponse?: boolean;
}

/**
 * GetErrorResponseParam in UserDevice class
 */
interface UserDeviceGetErrorResponseParam {
  type: ControllerErrorResponseType;
  message: string;
}

/**
 * Base class of User Device
 */
export abstract class UserDevice implements IUserDevice {
  protected readonly config: UserDeviceParam;
  constructor(param: Device.UserDeviceParam) {
    this.config = param;
  }

  /**
   * endpoint Id
   */
  public getEndpointId(): string {
    return this.config.event.directive.endpoint.endpointId;
  }

  /**
   * for more declarative approach, You can use this method.
   * @param behaviorDefinition mapping between alexa directive and device cloud action
   */
  protected async doDeviceAction(
    behaviorDefinition: Device.DeviceBehaviorDefinition
  ): Promise<Device.Response> {
    const { namespace, name } = this.config.event.directive.header;
    if (Object.keys(behaviorDefinition).length <= 0) throw Error('error');

    // @ts-ignore
    const response = await behaviorDefinition[namespace][name](
      this.config.event.directive
    );
    return response;
  }

  public abstract async sendSignal(): Promise<Device.Response>;

  /**
   * Get response header
   */
  protected getResponseHeader(name: ResponseName = 'Response'): Device.Header {
    return {
      namespace: 'Alexa',
      name: name,
      messageId: this.config.event.directive.header.messageId + '-R',
      payloadVersion: '3',
      correlationToken: this.config.event.directive.header.correlationToken,
    };
  }

  /**
   * switch endpoint for esponse between sync and async
   */
  protected getResponseEndpoint() {
    return this.config.isAsyncResponse
      ? this.config.event.directive.endpoint
      : {
          endpointId: this.config.event.directive.endpoint.endpointId,
        };
  }

  /**
   * Error sResponse
   * @param param UserDeviceGetErrorResponseParam
   */
  protected getErrorResponse(
    param: UserDeviceGetErrorResponseParam
  ): Device.Response {
    return {
      event: {
        header: this.getResponseHeader('ErrorResponse'),
        endpoint: this.getResponseEndpoint(),
        payload: {
          type: param.type,
          message: param.message,
        },
      },
    };
  }
}
