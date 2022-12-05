import { stat } from "fs";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, doc, addDoc, getDocs, updateDoc, setDoc, where } from "firebase/firestore";
import { FirebaseConfig } from "src/firebase/configs";
import { useState, useEffect } from "react";
import { device } from "@assets/svg";

const db = FirebaseConfig.getInstance().fbDB

interface TypeDevices {
    devicecategory: any;
    id?: string
    deviceID?: string
    deviceName?: string
    deviceIP?: string
    deviceStatus?: boolean
    deviceConnect?: boolean

    services?: string[]
    detail?: string
    update?: string
}
type serviceProps = {
    id?: string
    serviceID: string;
    serviceName: string;
    serviceStatus: boolean
    Growauto?: number[]
    Prefix?: string
    Surfix?: string
    Reset?: boolean
};

type accountStore = {
    id?: string
    name: string
    image: string
    eamil: string
    phone: string
    role: string
    status: boolean
    username: string
    password: string
};
type provideNumberProps = {
    id?: string
    dateduse: string
    linkServiceId: string
    stt: number
    timeprovide: string
    status: string
    service: serviceProps
    customer: accountStore
    devices: TypeDevices
};

interface ProvideNumber {
    Number: provideNumberProps[]
    providedNumber: number
}
const initialState: ProvideNumber = {
    Number: [],
    providedNumber: 2001203
}
export const fetchProvideNumber = createAsyncThunk("provideNumberStore/fetchprovidenumber", async (thunkAPI) => {
    let providenumbers: Array<undefined | object> = [];
    const q = collection(db, "providenumber");

    const querySnapshot = await getDocs(q);

    let id: string
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        id = doc.id
        providenumbers.push({ id, ...doc.data() });
    });

    return providenumbers as Array<provideNumberProps>;
})

export const createProvideNumber = createAsyncThunk("provideNumberStore/createProvideNumber", async (body: Omit<provideNumberProps, 'id'>, thunkAPI) => {
    addDoc(collection(db, 'providenumber'), {
        ...body
    })
    return {
        ...body,
    } as provideNumberProps;


})

export const provideNumberStore = createSlice({
    name: "provideNumberStore",
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(fetchProvideNumber.fulfilled, (state, action) => {
                state.Number = action.payload
            })

            .addCase(createProvideNumber.fulfilled, (state, action) => {
                state.providedNumber = state.providedNumber + 1
                state.Number.push(action.payload)
            })
    },
});