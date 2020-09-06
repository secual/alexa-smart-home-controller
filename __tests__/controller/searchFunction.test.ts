
import SmartHomeController from '../../src'
import { TestCaseMetaData, MockReturn, TestCaseExpectedFunction } from 'jest-simple-template'
import { DummyDevice2 } from './dummyDevice'

import mocks from './mocks'
import expected from './expected'
import { ControllerRequestEvent } from '../../src/device'
import { DiscoveryRequestEvent } from '../../src/discovery'
import { dummySearchFunction } from './dummySearchFunction'


/**
 * Test with definition each device
 */
const discoveryInput: DiscoveryRequestEvent = {
    directive: { 
        header: {
            namespace: 'Alexa.Discovery',
            name: 'Discover',
            payloadVersion: '3',
            messageId: 'id1'
        },
        payload: {
            scope: {
                type: 'BearerToken',
                token: 'token'
            }
        }
    }
}

const controllerSetBrightness: ControllerRequestEvent = {
    directive: {
        header: {
          namespace: 'Alexa.BrightnessController',
          name: 'SetBrightness',
          payloadVersion: '3',
          messageId: 'id1',
          correlationToken: 'cotoken'
        },
        endpoint: {
            scope: {
                type: 'BearerToken',
                token: 'token'
            },
            endpointId: '1',
            cookie: {}
        },
        payload: {
          brightness: 0
        }
    }
}

const controllerAdjustBrightness: ControllerRequestEvent = {
    directive: {
        header: {
          namespace: 'Alexa.BrightnessController',
          name: 'AdjustBrightness',
          payloadVersion: '3',
          messageId: 'id1',
          correlationToken: 'cotoken'
        },
        endpoint: {
            scope: {
                type: 'BearerToken',
                token: 'token'
            },
            endpointId: '1',
            cookie: {}
        },
        payload: {
          brightnessDelta: 10
        }
    }
}

/**
 * Test Case Definition
 *
 * [0]: test description
 * [1]: request(input)
 * [2]: expect(output)
 */
const testCase = [
    [
        // [0]: description
        {
            name: 'discoverySucceededWithSearchFunction',
            description: 'Alexa Discovery successfully'
        },
        // [1]: input of the test
        discoveryInput,
        // [2]: expected
        (result: {}, spies: MockReturn) => {
            console.log(spies)
            expect(result).toEqual(expected['discoverySucceededWithSearchFunction'])
        }
    ],
    [
        // [0]: description
        {
            name: 'controllerNoOperation',
            description: 'BrightnessController SetBrightness No operation',
        },
        // [1]: input of the test
        controllerSetBrightness,
        // [2]: expected
        (result: {}, spies: MockReturn) => {
            console.log(spies)
            expect(result).toEqual(expected['controllerNoOperation'])
        }
    ],
    [
        // [0]: description
        {
            name: 'controllerAdjustBrightness',
            description: 'BrightnessController AdjustBrightness request successfully',
        },
        // [1]: input of the test
        controllerAdjustBrightness,
        // [2]: expected
        (result: {}, spies: MockReturn) => {
            console.log(spies)
            expect(result).toEqual(expected['controllerAdjustBrightness'])
        }
    ]
]

// @ts-ignore
describe.each(testCase)('SmartHomeController: Devices and Discovery functions', (d, r, e) => {
    beforeEach(() => {
        jest.restoreAllMocks()
    })
    const testMeta = d as TestCaseMetaData
    it(`${testMeta.name}:${testMeta.description}`, async () => {
        let spies
        if (mocks.hasOwnProperty(testMeta.name)) {
            spies = mocks[testMeta.name]()
        }

        const shc = new SmartHomeController({
            event: r,
            devices: [
                // @ts-ignore
                new DummyDevice2({event: r})
            ],
            discoveryFunction: dummySearchFunction
        })
        const result = await shc.run()
        const expected = e as TestCaseExpectedFunction
        // @ts-ignore
        expected(result, spies)
    })
})
