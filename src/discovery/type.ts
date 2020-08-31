import {
  ControllerNameSpace,
  DiscoveryNameSpace,
  DiscoveryHeaderName,
} from '../namespace';
import { DeviceCategory } from './category';

/**
 * Alexa Interface version
 */
export const LATEST_INTERFACE_VERSION = '3';

/**
 * Discovery Interface
 * https://developer.amazon.com/en-US/docs/alexa/device-apis/alexa-discovery.html
 */

/**
 * DiscoveryRequest
 */
export interface DiscoveryRequestEvent {
  directive: DiscoveryRequestDirective;
}

/**
 * Directive object in DiscoveryRequest
 */
export interface DiscoveryRequestDirective {
  header: Header;
  payload: DiscoveryRequestPayload;
}

/**
 * Payload object in DiscoveryRequest
 */
export interface DiscoveryRequestPayload {
  scope: TokenScope | any;
}

/**
 * TokenScope
 */
export interface TokenScope {
  type: TokenType;
  token: string;
}

/**
 * Type of token
 */
export type TokenType = 'BearerToken' | string;

/**
 * Discovery Header
 */
export interface Header {
  namespace: DiscoveryNameSpace | ControllerNameSpace;
  name: DiscoveryHeaderName;
  payloadVersion: string;
  messageId: string;
}

/**
 * Discovery Response
 */
export interface Response {
  event: ResponseEvent;
  context?: ResponseContext;
}

/**
 * Discovery Response event object
 */
export interface ResponseEvent {
  header: Header;
  payload: Payload;
}

/**
 * Discovery Response context object
 */
export interface ResponseContext {
  [name: string]: any;
}
/**
 * Discovery Response Payload
 */
export interface Payload {
  endpoints: Endpoint[];
}

/**
 * EndpointInformation
 * https://developer.amazon.com/en-US/docs/alexa/device-apis/alexa-discovery.html#endpoint-object
 */
export interface Endpoint {
  endpointId: string;
  manufacturerName: string;
  description: string;
  friendlyName: string;
  displayCategories: DeviceCategory[];
  additionalAttributes?: AdditionalAttributes;
  capabilities: Capability[];
  connections?: Connections;
  relationships?: Relationships;
  cookie?: Cookie;
}

/**
 * EndpointInformation(Balk)
 */
export interface BalkEndpoint {
  endpointId: string;
  manufacturerName: string;
  description: string;
  friendlyName: string;
  displayCategories?: DeviceCategory[];
  additionalAttributes?: AdditionalAttributes;
  capabilities?: Capability[];
  connections?: Connections;
  relationships?: Relationships;
  cookie?: Cookie;
}

/**
 * Additional manufactures attributes
 * https://developer.amazon.com/en-US/docs/alexa/device-apis/alexa-discovery.html#additionalattributes-object
 */
export interface AdditionalAttributes {
  manufacturer?: string;
  model?: string;
  serialNumber?: string;
  firmwareVersion?: string;
  softwareVersion?: string;
  customIdentifier?: string;
}

/**
 * https://developer.amazon.com/en-US/docs/alexa/device-apis/alexa-discovery.html#connections-object
 */
export interface Connections {
  type: string;
  macAddress?: string;
  homeId?: string;
  nodeId: string;
  value?: string;
}

/**
 * Relationships object
 * https://developer.amazon.com/en-US/docs/alexa/device-apis/alexa-discovery.html#relationships-object
 */
export interface Relationships {
  isConnectedBy: {
    endpointId: string;
  };
}

/**
 * Cookie in the Endpoint
 */
export interface Cookie {
  [name: string]: string;
}

/**
 * Capability of each controller
 */
export interface Capability {
  type: string;
  interface: ControllerNameSpace;
  instance?: string;
  version: string;
  properties?: Properties;
  capabilityResources?: CapabilityResources;
  configuration?:
    | {}
    | ThermostatCapabilityConfiguration
    | RangeCapabilityConfiguration;
  verificationsRequired?: {};
  semantics?: Semantics;
}

/**
 * Capability Resources
 */
export interface CapabilityResources {
  friendlyNames: FriendlyName[];
}

/**
 * FriendlyName schema
 */
export type FriendlyName = PresetResourceAlexaAsset | PresetResourceCustomAsset;

/**
 * Capability Property
 */
export interface Properties {
  supported: Property[];
  proactivelyReported: boolean;
  retrievable: boolean;
}

/**
 * Capability Property Object
 */
export interface Property {
  name: string;
}

/**
 * Semantics object
 * https://developer.amazon.com/en-US/docs/alexa/device-apis/alexa-discovery.html#semantics-object
 */
export interface Semantics {
  actionMappings: ActionMapping[];
  stateMappings?: StateMapping[];
}

/**
 * Type of ActionMapping in Semantics object
 */
export type ActionMappingType = 'ActionsToDirective';

/**
 * ActionMapping Object
 * This object is part of Semantics object
 */
export interface ActionMapping {
  '@type': ActionMappingType;
  actions?: Action[];
  directive?: ActionMappingDirective;
}

/**
 * Actions in ActionMapping
 */
export type Action =
  | 'Alexa.Actions.Open'
  | 'Alexa.Actions.Close'
  | 'Alexa.Actions.Raise'
  | 'Alexa.Actions.Lower';

/**
 * Directive Object
 * This object is part of ActionMapping
 */
export interface ActionMappingDirective {
  name: string;
  payload: {};
}

/**
 * StateMapping object
 * This object is part of ActionMapping object
 */
export interface StateMapping {
  '@type': StateMappingType;
  states?: StateMappingState[];
  value?: any;
  range?: {};
}

/**
 * Value of state mapping
 */
export type StateMappingType = 'StatesToValue' | 'StatesToRange';

/**
 * Value of state mapping state
 */
export type StateMappingState = 'Alexa.States.Open' | 'Alexa.States.Closed';

/**
 * Thermostat capability configuration
 * (This is required on Discovery interface)
 */
export interface ThermostatCapabilityConfiguration {
  supportedModes: ThermostatMode[];
  supportsScheduling: boolean;
}

export interface RangeCapabilityConfiguration {
  supportedRange: {
    minimumValue: number;
    maximumValue: number;
    precision: number;
  };
  presets: RangeCapabilityConfigurationPreset[];
  unitOfMeasure: AssetId;
}

export interface RangeCapabilityConfigurationPreset {
  rangeValue: number;
  presetResources: {
    friendlyNames: PresetResourceFriendlyName[];
  };
}

export interface SupportedModes {
  value: string;
  modeResources: {
    friendlyNames: FriendlyName[];
  };
}
export interface ModeCapabilityConfiguration {
  ordered: boolean;
  supportedModes: SupportedModes;
}

export type PresetResourceFriendlyName =
  | PresetResourceAlexaAsset
  | PresetResourceCustomAsset;

/**
 * Thermo stat mode
 */
export type ThermostatMode = 'AUTO' | 'COOL' | 'HEAT' | 'ECO' | 'OFF';

export type PresetResourceType = 'asset' | 'text';

export interface PresetResourceAlexaAsset {
  '@type': 'asset';
  value: {
    assetId: AssetId;
  };
}

export interface PresetResourceCustomAsset {
  '@type': 'text';
  value: {
    text: string;
    locale: string;
  };
}

export type AssetId =
  | 'Alexa.DeviceName.AirPurifier'
  | 'Alexa.DeviceName.Fan'
  | 'Alexa.DeviceName.Router'
  | 'Alexa.DeviceName.Shade'
  | 'Alexa.DeviceName.Shower'
  | 'Alexa.DeviceName.SpaceHeater'
  | 'Alexa.DeviceName.Washer'
  | 'Alexa.Setting.2GGuestWiFi'
  | 'Alexa.Setting.5GGuestWiFi'
  | 'Alexa.Setting.Auto'
  | 'Alexa.Setting.Direction'
  | 'Alexa.Setting.DryCycle'
  | 'Alexa.Setting.FanSpeed'
  | 'Alexa.Setting.GuestWiFi'
  | 'Alexa.Setting.Heat'
  | 'Alexa.Setting.Mode'
  | 'Alexa.Setting.Night'
  | 'Alexa.Setting.Opening'
  | 'Alexa.Setting.Oscillate'
  | 'Alexa.Setting.Preset'
  | 'Alexa.Setting.Quiet'
  | 'Alexa.Setting.Temperature'
  | 'Alexa.Setting.WashCycle'
  | 'Alexa.Setting.WaterTemperature'
  | 'Alexa.Shower.HandHeld'
  | 'Alexa.Shower.RainHead'
  | 'Alexa.Unit.Angle.Degrees'
  | 'Alexa.Unit.Angle.Radians'
  | 'Alexa.Unit.Distance.Feet'
  | 'Alexa.Unit.Distance.Inches'
  | 'Alexa.Unit.Distance.Kilometers'
  | 'Alexa.Unit.Distance.Meters'
  | 'Alexa.Unit.Distance.Miles'
  | 'Alexa.Unit.Distance.Yards'
  | 'Alexa.Unit.Mass.Grams'
  | 'Alexa.Unit.Mass.Kilograms'
  | 'Alexa.Unit.Percent'
  | 'Alexa.Unit.Temperature.Celsius'
  | 'Alexa.Unit.Temperature.Degrees'
  | 'Alexa.Unit.Temperature.Fahrenheit'
  | 'Alexa.Unit.Temperature.Kelvin'
  | 'Alexa.Unit.Volume.CubicFeet'
  | 'Alexa.Unit.Volume.CubicMeters'
  | 'Alexa.Unit.Volume.Gallons'
  | 'Alexa.Unit.Volume.Liters'
  | 'Alexa.Unit.Volume.Pints'
  | 'Alexa.Unit.Volume.Quarts'
  | 'Alexa.Unit.Weight.Ounces'
  | 'Alexa.Unit.Weight.Pounds'
  | 'Alexa.Value.Close'
  | 'Alexa.Value.Delicate'
  | 'Alexa.Value.High'
  | 'Alexa.Value.Low'
  | 'Alexa.Value.Maximum'
  | 'Alexa.Value.Medium'
  | 'Alexa.Value.Minimum'
  | 'Alexa.Value.Open'
  | 'Alexa.Value.QuickWash';
