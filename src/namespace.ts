export type AlexaNameSpace = 'Alexa';
/**
 * Discovery namespace types
 */
export type DiscoveryNameSpace = 'Alexa.Discovery';

/**
 * Supported Header name
 */
export type DiscoveryHeaderName = 'Discover' | 'Discover.Response';

/**
 * Controller namespace types
 */
export type ControllerNameSpace =
  | 'Alexa.BrightnessController'
  | 'Alexa.Calendar'
  | 'Alexa.CameraStreamController'
  | 'Alexa.ChannelController'
  | 'Alexa.ColorController'
  | 'Alexa.ColorTemperatureController'
  | 'Alexa.ContactSensor'
  | 'Alexa.DoorbellEventSource'
  | 'Alexa.EqualizerController'
  | 'Alexa.EventDetectionSensor'
  | 'Alexa.InputController'
  | 'Alexa.InventoryLevelSensor'
  | 'Alexa.LockController'
  | 'Alexa.MediaMetadata'
  | 'Alexa.MeetingClientController'
  | 'Alexa.ModeController'
  | 'Alexa.MotionSensor'
  | 'Alexa.PercentageController'
  | 'Alexa.PowerController'
  | 'Alexa.PowerLevelController'
  | 'Alexa.RangeController'
  | 'Alexa.RTCSessionController'
  | 'Alexa.SceneController'
  | 'Alexa.SecurityPanelController'
  | 'Alexa.Speaker'
  | 'Alexa.StepSpeaker'
  | 'Alexa.TemperatureSensor'
  | 'Alexa.ThermostatController'
  | 'Alexa.TimeHoldController'
  | 'Alexa.ToggleController'
  | 'Alexa.WakeOnLANController';

export type ControllerResponseNameSpace =
  | 'Alexa'
  | 'Alexa.Cooking'
  | 'Alexa.Networking'
  | 'Alexa.Education'
  | 'Alexa.Business';

export type StateReportResponseName = 'StateReport';
export type ControllerResponseName = 'Response' | 'ErrorResponse';
export type ResponseName = ControllerResponseName | StateReportResponseName;

export type ControllerErrorResponseType =
  | 'ALREADY_IN_OPERATION'
  | 'BRIDGE_UNREACHABLE'
  | 'CLOUD_CONTROL_DISABLED'
  | 'ENDPOINT_BUSY'
  | 'ENDPOINT_LOW_POWER'
  | 'ENDPOINT_UNREACHABLE'
  | 'EXPIRED_AUTHORIZATION_CREDENTIAL'
  | 'FIRMWARE_OUT_OF_DATE'
  | 'HARDWARE_MALFUNCTION'
  | 'INSUFFICIENT_PERMISSIONS'
  | 'INTERNAL_ERROR'
  | 'INVALID_AUTHORIZATION_CREDENTIAL'
  | 'INVALID_DIRECTIVE'
  | 'INVALID_VALUE'
  | 'NO_SUCH_ENDPOINT'
  | 'NOT_CALIBRATED'
  | 'NOT_SUPPORTED_IN_CURRENT_MODE'
  | 'NOT_IN_OPERATION'
  | 'POWER_LEVEL_NOT_SUPPORTED'
  | 'RATE_LIMIT_EXCEEDED'
  | 'TEMPERATURE_VALUE_OUT_OF_RANGE'
  | 'TOO_MANY_FAILED_ATTEMPTS'
  | 'VALUE_OUT_OF_RANGE';

export type ThermostatControllerErrorResponseType =
  | 'REQUESTED_SETPOINTS_TOO_CLOSE'
  | 'THERMOSTAT_IS_OFF'
  | 'UNSUPPORTED_THERMOSTAT_MODE'
  | 'DUAL_SETPOINTS_UNSUPPORTED'
  | 'TRIPLE_SETPOINTS_UNSUPPORTED'
  | 'UNWILLING_TO_SET_SCHEDULE'
  | 'UNWILLING_TO_SET_VALUE';

/**
 * Controller Directive names (currently not cover all names)
 */
export type ControllerDirectiveName =
  | 'TurnOn'
  | 'TurnOff'
  | 'SetBrightness'
  | 'AdjustBrightness'
  | 'SetMode'
  | 'AdjustMode'
  | 'SetRangeValue'
  | 'AdjustRangeValue'
  | 'SetTargetTemperature'
  | 'AdjustTargetTemperature'
  | 'SetThermostatMode'
  | 'ResumeSchedule'
  | 'SkipChannels'
  | 'ChangeChannel'
  | 'AdjustVolume'
  | 'SetMute'
  | 'SetVolume'
  | 'AdjustVolume'
  | string;

export type ReportStateName = 'ReportState';

export type ReportStateResponseName = 'StateReport';

/**
 * Temperature Scale
 */
export type TemperatureScale = 'CELSIUS' | 'FAHRENHEIT' | 'KELVIN';

/**
 * Thermostat mode
 */
export type ThermostatMode =
  | 'OFF'
  | 'COOL'
  | 'HEAT'
  | 'AUTO'
  | 'ECO'
  | 'CUSTOM';
