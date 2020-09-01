    
import { Mocks } from 'jest-simple-template'

class Dummy {
    public method() {
        return 'dummy'
    }
}
const mocks: Mocks = {
    'discoverySucceeded': () => {
        // ToDo: write mock code if needed
        const spyDummyDevice = jest.spyOn(Dummy.prototype, 'method')
            .mockReturnValue('1')
        return {
            spyDummyDevice
        }
    },
    'controllerNoOperation': () => {
        // ToDo: write mock code if needed
        const spyDummyDevice = jest.spyOn(Dummy.prototype, 'method')
            .mockReturnValue('1')
        return {
            spyDummyDevice
        }
    },
}

export default mocks
    