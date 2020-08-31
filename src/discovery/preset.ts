import { ControllerNameSpace } from '../namespace';
import * as Discovery from './type';
import { DiscoveryRequestEvent } from './type';

/**
 * Parameter for createCapability method
 */
export interface CreateCapabilityParam {
  interface: ControllerNameSpace;
  supportedProperties?: string[];
  instance?: string;
  proactivelyReported?: boolean;
  retrieable?: boolean;
  capabilityResources?: Discovery.CapabilityResources;
  semantics?: Discovery.Semantics;
  configuration?:
    | {}
    | Discovery.ThermostatCapabilityConfiguration
    | Discovery.RangeCapabilityConfiguration
    | Discovery.ModeCapabilityConfiguration;
}

/**
 * Base object of Controller Capability
 */
const Version3ControllerCapability: Discovery.Capability = {
  type: 'AlexaInterface',
  interface: 'Alexa.BrightnessController',
  version: Discovery.LATEST_INTERFACE_VERSION,
};
/**
 * create Capability object
 * @param param Capability Param
 */
export function createCapability(
  param: CreateCapabilityParam
): Discovery.Capability {
  const capability: Discovery.Capability = {
    type: Version3ControllerCapability.type,
    version: Version3ControllerCapability.version,
    interface: param.interface,
  };

  if (param.instance) {
    capability.instance = param.instance;
  }

  if (param.capabilityResources) {
    capability.capabilityResources = param.capabilityResources;
  }

  if (param.semantics) {
    capability.semantics = param.semantics;
  }

  if (param.configuration) {
    capability.configuration = param.configuration;
  }

  if (param.supportedProperties) {
    capability.properties = {
      supported: param.supportedProperties.map(p => {
        return { name: p };
      }),
      proactivelyReported: !!param.proactivelyReported,
      retrievable: !!param.retrieable,
    };
  }
  return capability;
}

/**
 * Controller directive presets
 */

/**
 * PowerController with default value
 */
export const PowerControllerPreset = createCapability({
  interface: 'Alexa.PowerController',
  supportedProperties: ['powerState'],
});

/**
 * PowerLevelController with default value
 */
export const PowerLevelControllerPreset = createCapability({
  interface: 'Alexa.PowerLevelController',
  supportedProperties: ['powerLevel'],
});

/**
 * BrightnessController with default value
 */
export const BrightnessControllerPreset = createCapability({
  interface: 'Alexa.BrightnessController',
  supportedProperties: ['brightness'],
});

/**
 * Discovery preset of the light which has a fan
 */
export const FanOnLightToggleControllerPreset = createCapability({
  interface: 'Alexa.ToggleController',
  instance: 'LightFan.switch',
  supportedProperties: ['toggleState'],
  capabilityResources: {
    friendlyNames: [
      {
        '@type': 'text',
        value: {
          text: 'ファン',
          locale: 'ja-JP',
        },
      },
    ],
  },
  semantics: {
    actionMappings: [
      {
        '@type': 'ActionsToDirective',
        actions: ['Alexa.Actions.Close'],
        directive: {
          name: 'TurnOff',
          payload: {},
        },
      },
      {
        '@type': 'ActionsToDirective',
        actions: ['Alexa.Actions.Open'],
        directive: {
          name: 'TurnOn',
          payload: {},
        },
      },
    ],
    stateMappings: [
      {
        '@type': 'StatesToValue',
        states: ['Alexa.States.Closed'],
        value: 'OFF',
      },
      {
        '@type': 'StatesToValue',
        states: ['Alexa.States.Open'],
        value: 'ON',
      },
    ],
  },
});

/**
 * ChannelController with default value
 */
export const ChannelControllerPreset = createCapability({
  interface: 'Alexa.ChannelController',
  supportedProperties: ['channel'],
});

/**
 * StepSpeaker with default value
 */
export const StepSpeakerPreset = createCapability({
  interface: 'Alexa.StepSpeaker',
});

/**
 * Speaker with default value
 */
export const SpeakerPreset = createCapability({
  interface: 'Alexa.Speaker',
  supportedProperties: ['volume', 'muted'],
});

/**
 * Custom preset for Curtain device
 * This preset can accept 'Open', 'Close', 'Stop' utterance
 * Note: only compatible ja-JP locale
 */
export const CurtainToggleControllerPreset = createCapability({
  interface: 'Alexa.ToggleController',
  instance: 'Curtain',
  supportedProperties: ['toggleState'],
  capabilityResources: {
    friendlyNames: [
      {
        '@type': 'text',
        value: {
          text: 'カーテン',
          locale: 'ja-JP',
        },
      },
      {
        '@type': 'text',
        value: {
          text: '電動カーテン',
          locale: 'ja-JP',
        },
      },
    ],
  },
  semantics: {
    actionMappings: [
      {
        '@type': 'ActionsToDirective',
        actions: ['Alexa.Actions.Open'],
        directive: {
          name: 'TurnOn',
          payload: {},
        },
      },
      {
        '@type': 'ActionsToDirective',
        actions: ['Alexa.Actions.Close'],
        directive: {
          name: 'TurnOff',
          payload: {},
        },
      },
    ],
    stateMappings: [
      {
        '@type': 'StatesToValue',
        states: ['Alexa.States.Open'],
        value: 'ON',
      },
      {
        '@type': 'StatesToValue',
        states: ['Alexa.States.Closed'],
        value: 'OFF',
      },
    ],
  },
});

/**
 * ThermostatController preset with default value
 */
export const ThermostatControllerPreset = createCapability({
  interface: 'Alexa.ThermostatController',
  supportedProperties: [
    'targetSetpoint',
    'lowerSetpoint',
    'upperSetpoint',
    'thermostatMode',
  ],
  configuration: {
    supportedModes: ['AUTO', 'COOL', 'ECO', 'HEAT', 'OFF'],
    supportsScheduling: false,
  },
  retrieable: true,
  proactivelyReported: true,
});

/**
 * ThermostatModeController preset with default value
 */
export const ThermostatModeControllerPreset = createCapability({
  interface: 'Alexa.ModeController',
  supportedProperties: ['mode'],
  instance: 'Thermostat.mode',
  capabilityResources: {
    friendlyNames: [
      {
        '@type': 'asset',
        value: {
          assetId: 'Alexa.Setting.Mode',
        },
      },
      {
        '@type': 'text',
        value: {
          text: 'モード',
          locale: 'ja-JP',
        },
      },
    ],
  },
  configuration: {
    ordered: false,
    supportedModes: [
      {
        value: 'mode.Cool',
        modeResources: {
          friendlyNames: [
            {
              '@type': 'text',
              value: {
                text: '冷房',
                locale: 'ja-JP',
              },
            },
          ],
        },
      },
      {
        value: 'mode.Heat',
        modeResources: {
          friendlyNames: [
            {
              '@type': 'text',
              value: {
                text: '暖房',
                locale: 'ja-JP',
              },
            },
          ],
        },
      },
      {
        value: 'mode.Humidity',
        modeResources: {
          friendlyNames: [
            {
              '@type': 'text',
              value: {
                text: '加湿',
                locale: 'ja-JP',
              },
            },
          ],
        },
      },
      {
        value: 'mode.Fan',
        modeResources: {
          friendlyNames: [
            {
              '@type': 'text',
              value: {
                text: '送風',
                locale: 'ja-JP',
              },
            },
          ],
        },
      },
      {
        value: 'mode.Dehumidify',
        modeResources: {
          friendlyNames: [
            {
              '@type': 'text',
              value: {
                text: '除湿',
                locale: 'ja-JP',
              },
            },
            {
              '@type': 'text',
              value: {
                text: 'ドライ',
                locale: 'ja-JP',
              },
            },
          ],
        },
      },
    ],
  },
});

/**
 * Preset Fan (Low, Medium, High)
 */
export const FanRangeControllerPreset = createCapability({
  interface: 'Alexa.RangeController',
  instance: 'Fan.speed',
  supportedProperties: ['rangeValue'],
  capabilityResources: {
    friendlyNames: [
      {
        '@type': 'asset',
        value: {
          assetId: 'Alexa.DeviceName.Fan',
        },
      },
    ],
  },
  configuration: {
    supportedRange: {
      minimumValue: 0,
      maximumValue: 5,
      precision: 1,
    },
    presets: [
      {
        rangeValue: 0,
        presetResources: {
          friendlyNames: [
            {
              '@type': 'asset',
              value: {
                assetId: 'Alexa.Value.Minimum',
              },
            },
            {
              '@type': 'text',
              value: {
                text: '最弱',
                locale: 'ja-JP',
              },
            },
          ],
        },
      },
      {
        rangeValue: 1,
        presetResources: {
          friendlyNames: [
            {
              '@type': 'asset',
              value: {
                assetId: 'Alexa.Value.Low',
              },
            },
          ],
        },
      },
      {
        rangeValue: 2,
        presetResources: {
          friendlyNames: [
            {
              '@type': 'asset',
              value: {
                assetId: 'Alexa.Value.Medium',
              },
            },
          ],
        },
      },
      {
        rangeValue: 3,
        presetResources: {
          friendlyNames: [
            {
              '@type': 'asset',
              value: {
                assetId: 'Alexa.Value.High',
              },
            },
          ],
        },
      },
      {
        rangeValue: 4,
        presetResources: {
          friendlyNames: [
            {
              '@type': 'asset',
              value: {
                assetId: 'Alexa.Value.Maximum',
              },
            },
            {
              '@type': 'text',
              value: {
                text: '最強',
                locale: 'ja-JP',
              },
            },
          ],
        },
      },
    ],
  },
});

/**
 * Getting Devices from Device Cloud
 */
export type DiscoveryFunction = (
  event: DiscoveryRequestEvent
) => Promise<Discovery.Endpoint[]>;
