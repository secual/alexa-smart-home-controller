import * as Discovery from '../../src/discovery'
import * as Device from '../../src/device'
import { DeviceCategory } from '../../src/discovery'
import { ControllerRequestEvent } from '../../src/device'

export class DummyDevice extends Device.UserDevice {
    public getEndpointId() {
        return '1' // should be matched getDeviceDescriptor.endpointId
    }

    public getCategory(): DeviceCategory[] {
        return ['LIGHT']
    }

    public getDeviceDescriptor() {
        /**
         * Call to your device cloud to get device meta data
         */
        const dd: Device.DeviceDescriptor = {
            endpointId: '1',
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

    public getDeviceBehavior() {
        const r: Device.Response = {
            event: {
                header: this.getResponseHeader(),
                endpoint: this.getResponseEndpoint(),
                payload: {} 
            }
        }
        return {
            'Alexa.BrightnessController': {
                // @ts-ignore
                SetBrightness: async (directive) => {
                    return this.getErrorResponse({
                        type: 'NOT_IN_OPERATION',
                        message: 'This operation is not supported.'
                    })
                },
                // @ts-ignore
                AdjustBrightness: async (directive) => {
                    const {
                        payload,
                    } = directive
    
                    const brightnessDelta = payload.brightnessDelta
                    // @ts-ignore
                    r.context = {
                        properties: [
                            {
                                namespace: 'Alexa.BrightnessController',
                                name: 'brightness',
                                value: brightnessDelta,
                                timeOfSample: 'time',
                                uncertaintyInMilliseconds: 1000
                            }
                        ]
                    }
                    return r
                }
            },
            'Alexa.PowerController': {
                // @ts-ignore
                TurnOn: async (directive) => {
                    return r
                },
                // @ts-ignore
                TurnOff: async (directive) => {
                    return r
                }
            },
            'Alexa.ToggleController': {
                // @ts-ignore
                TurnOn: async (directive) => {
                    return r
                },
                // @ts-ignore
                TurnOff: async (directive) => {
                    return r
                }            
            }
        }
    }
}

export class DummyDevice2 extends Device.UserDevice {
    public getEndpointId() {
        return '1' // should be matched getDeviceDescriptor.endpointId
    }

    public getCategory = undefined
    public getDeviceDescriptor = undefined
    public getCapability = undefined

    public getDeviceBehavior() {
        const r: Device.Response = {
            event: {
                header: this.getResponseHeader(),
                endpoint: this.getResponseEndpoint(),
                payload: {} 
            }
        }
        return {
            'Alexa.BrightnessController': {
                // @ts-ignore
                SetBrightness: async (directive) => {
                    return this.getErrorResponse({
                        type: 'NOT_IN_OPERATION',
                        message: 'This operation is not supported.'
                    })
                },
                // @ts-ignore
                AdjustBrightness: async (directive) => {
                    const {
                        payload,
                    } = directive
    
                    const brightnessDelta = payload.brightnessDelta
                    // @ts-ignore
                    r.context = {
                        properties: [
                            {
                                namespace: 'Alexa.BrightnessController',
                                name: 'brightness',
                                value: brightnessDelta,
                                timeOfSample: 'time',
                                uncertaintyInMilliseconds: 1000
                            }
                        ]
                    }
                    return r
                }
            },
            'Alexa.PowerController': {
                // @ts-ignore
                TurnOn: async (directive) => {
                    return r
                },
                // @ts-ignore
                TurnOff: async (directive) => {
                    return r
                }
            },
            'Alexa.ToggleController': {
                // @ts-ignore
                TurnOn: async (directive) => {
                    return r
                },
                // @ts-ignore
                TurnOff: async (directive) => {
                    return r
                }            
            }
        }
    }
}

export class DummyDevice3 extends Device.UserDevice {
    public getEndpointId() {
        return '2' // should be matched getDeviceDescriptor.endpointId
    }

    public matcher(event: ControllerRequestEvent): boolean {
        console.log('[ASHC]: matcher on derived class')
        return event.directive.endpoint.endpointId === '1'
    }

    public getCategory = undefined
    public getDeviceDescriptor = undefined
    public getCapability = undefined

    public getDeviceBehavior() {
        const r: Device.Response = {
            event: {
                header: this.getResponseHeader(),
                endpoint: this.getResponseEndpoint(),
                payload: {} 
            }
        }
        return {
            'Alexa.BrightnessController': {
                // @ts-ignore
                SetBrightness: async (directive) => {
                    return this.getErrorResponse({
                        type: 'NOT_IN_OPERATION',
                        message: 'This operation is not supported.'
                    })
                },
                // @ts-ignore
                AdjustBrightness: async (directive) => {
                    const {
                        payload,
                    } = directive
    
                    const brightnessDelta = payload.brightnessDelta
                    // @ts-ignore
                    r.context = {
                        properties: [
                            {
                                namespace: 'Alexa.BrightnessController',
                                name: 'brightness',
                                value: brightnessDelta,
                                timeOfSample: 'time',
                                uncertaintyInMilliseconds: 1000
                            }
                        ]
                    }
                    return r
                }
            },
            'Alexa.PowerController': {
                // @ts-ignore
                TurnOn: async (directive) => {
                    return r
                },
                // @ts-ignore
                TurnOff: async (directive) => {
                    return r
                }
            },
            'Alexa.ToggleController': {
                // @ts-ignore
                TurnOn: async (directive) => {
                    return r
                },
                // @ts-ignore
                TurnOff: async (directive) => {
                    return r
                }            
            }
        }
    }
}

