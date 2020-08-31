import {
  ControllerDirectiveName,
  ControllerNameSpace,
  AlexaNameSpace,
  ReportStateName,
} from '../namespace';
import * as Device from './type';

type Namespace = ControllerNameSpace | AlexaNameSpace;
type Name = ControllerDirectiveName | ReportStateName;

/**
 * Behavior definition which map directive
 * from Alexa to the specific action of DeviceCloud
 * @example
 * {
 *   'Alexa.BrightnessController': {
 *     'SetBrightness': (directive: Device.Directive) => {
 *       const r: DeviceResponse = {
 *         // construct response event
 *       }
 *       return r
 *     }
 *   }
 * }
 */
export type DeviceBehaviorDefinition = {
  [namespace in Namespace]?: {
    [name in Name]?: DeviceBehavior;
  };
};

/**
 * Device action
 */
export type DeviceBehavior = (
  directive: Device.Directive
) => Promise<Device.Response>;
