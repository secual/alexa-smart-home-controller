# alexa-smart-home-controller (beta)
This package make your smart home skill code simpler.

** Important: This package is now Work in progress.

# Concept
- Be Readable
- Can be more focus to implement a logic of device cloud
- Implement simplify

# install

```
npm install alexa-smart-home-controller

or

yarn add alexa-smart-home-controller
```

# example

```javascript
import SmartHomeController from 'alexa-smart-home-controller'

// Yous have to implement a logic of your device cloud
import * as DeviceCloud from './deviceCloud'

// @ts-ignore
export const handler = async (event, context) => {
  console.log(event, context)
  console.log(JSON.stringify(event))

  const controller = new SmartHomeController(
    event,
    DeviceCloud.discoverFunc,
    DeviceCloud.searchFunc
  )

  const response = await controller.run()
  return response
};
```

# How to implement your Smart Home Skill with alexa-smart-home-controller
## Step1: implement device discovery function
Smart home skill has to discover user devices from device cloud.
You can implement discovery logic as DeviceSearchFunction object.
This object needs for creating SmartHomeController instance.

```javascript
 export type DeviceSearchFunction = (
  event: Device.ControllerRequestEvent
) => Promise<Device.IUserDevice>;
```

## Step2: implement device object
In this package, Requesting to the device cloud is used through the UserDevice object.
For example, when your skill request to the light device, You will implement a device object
for the light device.

```typescript
class LightDevice extends Device.UserDevice {
  public async sendSignal(): Promise<Device.Response | {}> {
    const header = this.event.directive.header

    switch (header.name) {
      case 'SetBrightness':
          // Requesting for your light device to the device cloud here.
          break;
      case 'AdjustBrightness':
          // Requesting for your light device to the device cloud here.
        break;
      default:
        break;
    }
    const r: Device.Response = {
      event: {
        header: {
          namespace: 'Alexa',
          name: 'Response',
          messageId: this.event.directive.header.messageId + '-R',
          payloadVersion: '3',
          correlationToken: 'token1'
        },
        endpoint: this.event.directive.endpoint,
        payload: 'hoge' 
      },
      context: {
        properties: [
          {
            namespace: header.namespace,
            name: header.name,
            value: 'ON',
            timeOfSample: 'test',
            uncertaintyInMilliseconds: 50
          }
        ]
      }
    }
    return r
  }
}
```
## Step3: implement search device function
This package is made for skill can respond utterances for several types of devices.
So You have to find target device from user utterance.
DeviceSearchFunction object is to do so.

Easiest way is check device category. (below)

```typescript
export const searchFunc: Device.DeviceSearchFunction = async (event) => {
  // @ts-ignore
  return DeviceMap[event.directive.header.namespace](event)
}

export const DeviceMap = {
  'Alexa.BrightnessController': (event: Device.ControllerRequestEvent) => {
    return new LightDevice(event)
  },
  'Alexa.ChannelController': (event: Device.ControllerRequestEvent) => {
    return new TvDevice(event)
  }
}
```