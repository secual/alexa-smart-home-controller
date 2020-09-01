    
import { Mocks } from 'jest-simple-template'
import { DummyDevice } from './dummyDevice'

const mocks: Mocks = {
    'discoverySucceeded': () => {
        // ToDo: write mock code if needed
        const spyDummyDevice = jest.spyOn(DummyDevice.prototype, 'getEndpointId')
            .mockReturnValue('1')
        return {
            spyDummyDevice
        }
    },
    'controllerSucceeded': () => {
        // ToDo: write mock code if needed
        const spyDummyDevice = jest.spyOn(DummyDevice.prototype, 'getEndpointId')
            .mockReturnValue('1')
        return {
            spyDummyDevice
        }
    },
}

export default mocks
    