import { Discovery } from '../../src';
export const dummySearchFunction: Discovery.DiscoveryFunction = async (event): Promise<Discovery.Endpoint[]> => {
    console.log(event)
    return [
        {
            endpointId: '1',
            manufacturerName: 'manufacture1',
            description: 'desc1',
            friendlyName: 'device1', 
            displayCategories: ['LIGHT'],
            capabilities: [
                Discovery.BrightnessControllerPreset
            ],
            cookie: {} 
        }
        // {
        //     endpointId: '2',
        //     manufacturerName: 'manufacture2',
        //     description: 'desc2',
        //     friendlyName: 'device2', 
        //     displayCategories: ['TV'],
        //     capabilities: [
        //         Discovery.ChannelControllerPreset
        //     ],
        //     cookie: {} 
        // }
    ]
}