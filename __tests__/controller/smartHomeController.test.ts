
import SmartHomeController from '../../src'
import { TestCaseMetaData, MockReturn, TestCaseExpectedFunction } from 'jest-simple-template'
import { DummyDevice } from './dummyDevice'

import mocks from './mocks'
import expected from './expected'
import { ControllerRequestEvent } from '../../src/device'
import { DiscoveryRequestEvent } from '../../src/discovery'

// let input = {}

let discoveryInput: DiscoveryRequestEvent = {
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

let controllerInput: ControllerRequestEvent = {
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
            name: 'discoverySucceeded',
            description: 'description of test'
        },
        // [1]: input of the test
        discoveryInput,
        // [2]: expected
        (result: {}, spies: MockReturn) => {
            console.log(spies)
            expect(result).toEqual(expected['discoverySucceeded'])
        }
    ],
    [
        // [0]: description
        {
            name: 'controllerSucceeded',
            description: 'description of test'
        },
        // [1]: input of the test
        controllerInput,
        // [2]: expected
        (result: {}, spies: MockReturn) => {
            console.log(spies)
            expect(result).toEqual(expected['controllerSucceeded'])
        }
    ]
]

// @ts-ignore
describe.each(testCase)('SmartHomeController', (d, r, e) => {
    beforeEach(() => {
        jest.resetAllMocks()
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
                new DummyDevice({event: r})
            ]
        })
        const result = await shc.run()
        const expected = e as TestCaseExpectedFunction
        // @ts-ignore
        expected(result, spies)
    })
})
