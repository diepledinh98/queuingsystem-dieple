import { async } from "@firebase/util";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, doc, addDoc, getDocs, updateDoc, setDoc, where } from "firebase/firestore";
import { FirebaseConfig } from "src/firebase/configs";
import { useState, useEffect } from "react";
import { device } from "@assets/svg";

const db = FirebaseConfig.getInstance().fbDB
export interface deviceProps {
    id?: string
    deviceID: string;
    deviceName: string;
    deviceIP: string;
    deviceStatus: boolean
    devicecategory: string;
    deviceConnect: boolean
    services: string[]
    detail: string
    update: string
    username: string
    password: string
};

interface Devices {
    devices: deviceProps[]
}

const initialState: Devices = {
    devices: []
}

export const fetchDevicesNew = createAsyncThunk("newdevice/fetchdevicesnew", async (thunkAPI) => {
    let devices: Array<undefined | object> = [];
    const q = collection(db, "devices");

    const querySnapshot = await getDocs(q);

    let id: string
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        id = doc.id
        devices.push({ id, ...doc.data() });
    });

    return devices as Array<deviceProps>;
})

export const createDevice = createAsyncThunk("newdevice/createdevice", async (body: Omit<deviceProps, 'id'>, thunkAPI) => {
    addDoc(collection(db, 'devices'), {
        ...body
    })
    return {
        ...body,
    } as deviceProps;


})

export const updateDevice = createAsyncThunk("newdevice/updatedevice", async ({ idDevice, body }: { idDevice: string, body: deviceProps }, thunkAPI) => {
    const deviceNeedUpdate = doc(db, "devices", idDevice);
    updateDoc(deviceNeedUpdate, { ...body })
    return {
        ...body,
    } as deviceProps;
})
export const DeviceNewStore = createSlice({
    name: "newdevice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDevicesNew.fulfilled, (state, action) => {
                state.devices = action.payload
            })
            .addCase(createDevice.fulfilled, (state, action) => {
                state.devices.push(action.payload)
            })
            .addCase(updateDevice.fulfilled, (state, action) => {
                state.devices.find((device, index) => {
                    if (device.id === action.payload.id) {
                        state.devices[index] = action.payload
                        return true
                    }
                    return false
                })
            })
    }
})
