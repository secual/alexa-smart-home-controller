import SmartHomeController from '../src'
import * as DeviceCloud from './deviceCloud'


// @ts-ignore
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