import { Device, Discovery } from '../src'

class YourDeviceCloud {
    public call(val): string {
        return val
    }
}

export class MyLightDevice extends Device.UserDevice {
    public getEndpointId() {
        return '1'
    }

    public getCategory() {
        return ['LIGHT']
    }

    public getDeviceDescriptor() {
        const dd: Device.DeviceDescriptor = {
            endpointId: '1', // should be matched value from getEndpointId()
            name: 'mylightdevice',
            description: 'description',
            manufactureName: 'manu',
            friendlyName: 'fname',
            cookie: {hoge: 'hoge'}
        }
        return dd
    }

    public getCapability() {
        return [
            Discovery.BrightnessControllerPreset,
            Discovery.PowerControllerPreset,
            Discovery.FanOnLightToggleControllerPreset
        ]
    }

    public async sendSignal() {
        return {
            event: {
                header: this.getResponseHeader(),
                endpoint: this.getResponseEndpoint(),
                payload: {} 
            },
            context: {
                properties: []
            }
        }
    }

    public getDeviceBehavior() {
        const r = {
            event: {
                header: this.getResponseHeader(),
                endpoint: this.getResponseEndpoint(),
                payload: {} 
            },
            context: {
                properties: []
            }
        }
        return {
            'Alexa.BrightnessController': {
                SetBrightness: async (directive) => {
                    return this.getErrorResponse({
                        type: 'NOT_IN_OPERATION',
                        message: 'This operation is not supported.'
                    })
                },
                AdjustBrightness: async (directive) => {
                    const {
                        payload,
                    } = directive
    
                    const brightnessDelta = payload.brightnessDelta
                    const after = await new YourDeviceCloud().call(brightnessDelta)
                    r.context.properties.push({
                        namespace: 'Alexa.BrightnessController',
                        name: 'brightness',
                        value: after,
                        timeOfSample: '',
                        uncertaintyInMilliseconds: 1000
                    })
                    return r
                }
            },
            'Alexa.PowerController': {
                TurnOn: async (directive) => {
                    const {
                        payload,
                    } = directive
    
                    await new YourDeviceCloud().call('turnOn')
                    return r
                },
                TurnOff: async (directive) => {
                    const {
                        payload,
                    } = directive
    
                    await new YourDeviceCloud().call('turnOff')
                    return r
                }
            },
            'Alexa.ToggleController': {
                TurnOn: async (directive) => {
                    const {
                        payload,
                    } = directive
    
                    await new YourDeviceCloud().call('fanOn')
                    return r
                },
                TurnOff: async (directive) => {
                    const {
                        payload,
                    } = directive
    
                    await new YourDeviceCloud().call('fanOff')
                    return r
                }            
            }
        }
    }
}