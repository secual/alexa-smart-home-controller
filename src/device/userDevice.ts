import { ResponseName, ControllerErrorResponseType } from '../namespace';

import * as Device from './index';
import { ControllerRequestEvent } from './type';
import {
  Endpoint,
  Capability,
  DeviceCategory,
  DiscoveryRequestEvent,
} from 'discovery';

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
  getDeviceDescriptor(): DeviceDescriptor;
  getCapability(): Capability[];
  getCategory(): DeviceCategory[];
  buildEndpoint(): Endpoint;
  getDeviceBehavior(): Device.DeviceBehaviorDefinition;
}

export interface DeviceDescriptor {
  endpointId: string;
  name: string;
  description: string;
  manufactureName: string;
  friendlyName: string;
  cookie?: {};
}

/**
 * Parameter of constructor UserDevice class
 */
export interface UserDeviceParam {
  event: ControllerRequestEvent | DiscoveryRequestEvent;
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
  public abstract getEndpointId(): string;

  /**
   * endpoint Id
   */
  public abstract getDeviceDescriptor(): DeviceDescriptor;

  /**
   * endpoint
   */
  public abstract getCapability(): Capability[];

  /**
   * Device Category
   */
  public abstract getCategory(): DeviceCategory[];

  /**
   * Device Behavior
   */
  public abstract getDeviceBehavior(): Device.DeviceBehaviorDefinition;

  /**
   * Sending Signal
   */
  // public abstract sendSignal(): Promise<Device.Response>;
  public async sendSignal(): Promise<Device.Response> {
    const behavior = this.getDeviceBehavior();
    const { namespace, name } = this.config.event.directive.header;
    if (Object.keys(behavior).length <= 0) throw Error('error');

    // @ts-ignore
    const response = await behavior[namespace][name](
      this.config.event.directive
    );
    return response;
  }

  /**
   * return endpoint
   */
  public buildEndpoint(): Endpoint {
    const desc = this.getDeviceDescriptor();
    const categories = this.getCategory();
    const capabilities = this.getCapability();
    return {
      endpointId: desc.endpointId,
      manufacturerName: desc.manufactureName,
      description: desc.manufactureName,
      friendlyName: desc.friendlyName,
      displayCategories: categories,
      capabilities: capabilities,
      cookie: desc.cookie,
    };
  }

  /**
   * Get response header
   */
  protected getResponseHeader(name: ResponseName = 'Response'): Device.Header {
    const directive = this.config.event.directive as Device.Directive;
    return {
      namespace: 'Alexa',
      name: name,
      messageId: directive.header.messageId + '-R',
      payloadVersion: '3',
      correlationToken: directive.header.correlationToken,
    };
  }

  /**
   * switch endpoint for esponse between sync and async
   */
  protected getResponseEndpoint() {
    const directive = this.config.event.directive as Device.Directive;
    return this.config.isAsyncResponse
      ? directive.endpoint
      : {
          endpointId: directive.endpoint.endpointId,
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
