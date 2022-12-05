import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";

type deviceProps = {
    id?: string
    deviceID: string;
    deviceName: string;
    deviceIP: string;
    deviceStatus: boolean
    deviceConnect: boolean
    services: string[]
    detail: string
    update: string
    username: string
    password: string
};
// const device = {
//     deviceId: "",
//     deviceName: "",
//     deviceIp: "",
//     deviceType: "",
//     deviceNameToLogin: "",
//     devicePassword: "",
//     deviceService: "",
// };
interface IStore {
    statusAdd?: boolean;
    devices?: deviceProps[] | object[];
}
// export const fetchDevices = createAction<{
//   devices: Array<object | undefined>;
// }>("devices/get");
export const addDeviceInStore = createAction<{ device: object }>("devices/add");
export const deviceStore = createSlice({
    name: "deviceStore",
    initialState: {
        statusAdd: false,
        devices: [],
    } as unknown as IStore,
    reducers: {
        addDeviceInStore: (
            state,
            action: PayloadAction<{
                device: object;
            }>
        ) => Object.assign(state, { device: action.payload }),

        fetchDevices: (
            state,
            action: PayloadAction<{
                devices: object[] | any;
            }>
        ) => Object.assign(state, { devices: action.payload.devices }),

        // fetchDevices: (
        //   state,
        //   action: PayloadAction<{ devices: Array<object | undefined> }>
        // ) => {
        //   console.log(action.payload.devices, "instore devie nônnoo");
        //   return Object.assign(state, { devices: action.payload.devices });
        // },
    },
});