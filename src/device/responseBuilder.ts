import * as NS from '../namespace';
import { Context } from './type';
import moment from 'moment';

/**
 * Thermostat response context
 * @param mode ThermostatMode
 * @param targetSetpoint targetSetpoint
 * @param temperature temperature
 * @param scale scale
 */
export const ContextSetThermostatModeResponse = (
  mode: NS.ThermostatMode,
  targetSetpoint: number,
  temperature: number,
  scale: NS.TemperatureScale
): Context => {
  const timeOfSample = moment().format();
  return {
    properties: [
      {
        namespace: 'Alexa.ThermostatController',
        name: 'thermostatMode',
        value: mode,
        timeOfSample: timeOfSample,
        uncertaintyInMilliseconds: 500,
      },
      {
        namespace: 'Alexa.ThermostatController',
        name: 'targetSetpoint',
        value: {
          value: targetSetpoint,
          scale: scale,
        },
        timeOfSample: timeOfSample,
        uncertaintyInMilliseconds: 500,
      },
      {
        namespace: 'Alexa.TemperatureSensor',
        name: 'temperature',
        value: {
          value: temperature,
          scale: scale,
        },
        timeOfSample: timeOfSample,
        uncertaintyInMilliseconds: 500,
      },
    ],
  };
};
