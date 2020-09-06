# alexa-smart-home-controller (beta)
Alexa Smart Home Controller makes your implementation simpler. 

Original Reference (on Amazon)
https://developer.amazon.com/en-US/docs/alexa/smarthome/understand-the-smart-home-skill-api.html


## Concept

- Readable and easier understandable structure
- Developer can be more focus on their device cloud implementation

This library is designed Developer can make code easier by riding some conventions on this package.

## install

```
npm install alexa-smart-home-controller

or

yarn add alexa-smart-home-controller
```

## example

This is a example of Lambda handler which is called from Alexa.

```typescript
import SmartHomeController from 'alexa-smart-home-controller'
import * as DeviceCloud from './deviceCloud'

export const handler = async (event, context) => {
    console.log(event, context)
    console.log(JSON.stringify(event))

    const devices = [
      new DeviceCloud.MyLightDevice({
        event
      })
    ]

    const controller = new SmartHomeController({
      event,
      devices
    })
  
    const response = {
      event: await controller.run()
    }
    context.succeed(response)
};
```


## Implementation Step

### Step1: Design device's Capability and Behavior
First You will implement your device capability and behavior as a device class which extends from UserDevice base class.

```javascript
import { Device, Discovery } from 'alexa-smart-home-controller'

// this is a dummy of device cloud
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
```

the alexa-smart-home-controller requires implementation of some methods which defines on  the UserDevice base class.

```javascript
  /**
   * endpoint Id
   */
  public abstract getEndpointId(): string;

  /**
   * endpoint Id
   * Important: DeviceDescriptor.endpointId is set to the 
   * directive.endpoint.endpointId in the SmartHomeSkill.
   */
  public abstract getDeviceDescriptor?(): DeviceDescriptor;

  /**
   * endpoint
   */
  public abstract getCapability?(): Capability[];

  /**
   * Device Category
   */
  public abstract getCategory?(): DeviceCategory[];

  /**
   * Device Behavior
   */
  public abstract getDeviceBehavior(): Device.DeviceBehaviorDefinition
}
```

### Step2: Implement lambda handler by using SmartHomeController
After defined device, You will implement your lambda handler with using SmartHomeController instance.
Pass your device instance to the Constructor of the SmartHomeController.

This is a code example same as the example section.

```typescript
import SmartHomeController from 'alexa-smart-home-controller'
import * as DeviceCloud from './deviceCloud'

export const handler = async (event, context) => {
    console.log(event, context)
    console.log(JSON.stringify(event))

    const devices = [
      new DeviceCloud.MyLightDevice({
        event
      })
    ]

    const controller = new SmartHomeController({
      event,
      devices
    })
  
    const response = {
      event: await controller.run()
    }
    context.succeed(response)
};
```

## Discovery option
By device cloud,  there is a case which all device information will get by a call like a list function.
You can also implement discovery behavior individually as DiscoveryFunction

DiscoveryFunction is a function which return all discovery endpoints

```javascript
/**
 * Getting Devices from Device Cloud
*/
export type DiscoveryFunction = (
  event: DiscoveryRequestEvent
) => Promise<Endpoint[]>;
```

You can pass as this function as a parameter of constructor of SmartHomeController.

```javascript
import SmartHomeController from 'alexa-smart-home-controller'
import * as DeviceCloud from './deviceCloud'

export const handler = async (event, context) => {
    console.log(event, context)
    console.log(JSON.stringify(event))

    const devices = [
      new DeviceCloud.MyLightDevice({
        event
      })
    ]

    const controller = new SmartHomeController({
      event,
      devices,
      DeviceCloud.YourDiscoveryFunction
    })
  
    const response = {
      event: await controller.run()
    }
    context.succeed(response)
};
```

When you pass your discoveryFunction,  Some methods in the UserDevice class does not have to implement.


```javascript

export class DummyDevice2 extends Device.UserDevice {
    public getEndpointId() {
        return '1' // should be matched getDeviceDescriptor.endpointId
    }

    // You don't need implement these methods when you use discovery function. (Make sure set undefined these methods)
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
```

## Custom Device Mapper
There are some cases which provides same class instance to the different devices. Imagine it user has more than 2 AirConditioner.

this example,  return lighting device object if required device is light. (supposed to be set the deviceType in the cookie object)

```javascript
export class MyLightDevice extends Device.UserDevice {
    public getEndpointId() {
        return '1'
    }
    
    publich matcher(event: ControllerRequestEvent): boolean {
      return event.directive.cookie.deviceType === 'lighting'
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
```

## Preset Resources
Alexa-Smart-Home-Controller has several preset capability resources. 
You will build easier to design your device capability.

**Note: Currently, Only en-US locale has compatibility. (Several resource has ja-JP compatibility.)**

To use preset, Implement it in the UserDevice.getCapability method.

example
```javascript
    public getCapability() {
        return [
            Discovery.BrightnessControllerPreset,
            Discovery.PowerControllerPreset,
            Discovery.FanOnLightToggleControllerPreset
        ]
    }
```

To check all presets, see preset.ts file
https://github.com/secual/alexa-smart-home-controller/blob/master/src/discovery/preset.ts


## Package convention
Alexa-Smart-Home-Controller calls some of abstract methods from internal.

The rules is below.

```javascript
  /**
   * return endpoint id of your device.
   * This method is called when Alexa Controller Request received.
   * SmartHomeController check equality this value and Directive.endpoint.endpointId
    * This is automatically called when Alexa Controller Request Received.
   */
  public abstract getEndpointId(): string;

  /**
   * return you device meta data as DeviceDescriptror
   * Important: DeviceDescriptor.endpointId is set to the 
   * directive.endpoint.endpointId in the SmartHomeSkill.
   * You will access your deviceCloud to make the descriptor at this method.
   * This is automatically called when Alexa Discovery Request Received when without the discoveryFunction
   */
  public abstract getDeviceDescriptor?(): DeviceDescriptor;

  /**
   * return your device capability
   * This is automatically called when Alexa Discovery Request Received when without the discoveryFunction
   */
  public abstract getCapability?(): Capability[];

  /**
   * return you device category
   * This is automatically called when Alexa Discovery Request Received when without the discoveryFunction
   */
  public abstract getCategory?(): DeviceCategory[];

  /**
   * return your device behavior.
   * You will access your deviceCloud in each behavior.
   * This is automatically called when Alexa Controller Request Received.
   */
  public abstract getDeviceBehavior(): Device.DeviceBehaviorDefinition
}
```


