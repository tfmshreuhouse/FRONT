import { atom } from 'recoil';

export const testState = atom ({
    key: "test",
    default: {nombre: "marcus", edad: "27"}
})