import { async } from "@firebase/util";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, doc, addDoc, getDocs, updateDoc, setDoc, where } from "firebase/firestore";
import { FirebaseConfig } from "src/firebase/configs";
import { useState, useEffect } from "react";
import { device } from "@assets/svg";
const db = FirebaseConfig.getInstance().fbDB
export interface historyProps {
    id?: string
    username: string
    time: string
    IP: string
    action: string
}

interface History {
    historys: historyProps[]
}

const initialState: History = {
    historys: []
}
export const fetchHistorys = createAsyncThunk("history/fetchhistorys", async (thunkAPI) => {
    let historys: Array<undefined | object> = [];
    const q = collection(db, "historys");

    const querySnapshot = await getDocs(q);

    let id: string
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        id = doc.id
        historys.push({ id, ...doc.data() });
    });

    return historys as Array<historyProps>;
})

export const createHistorys = createAsyncThunk("history/createhistory", async (bodyHistory: Omit<historyProps, 'id'>, thunkAPI) => {
    addDoc(collection(db, 'historys'), {
        ...bodyHistory
    })
    return {
        ...bodyHistory,
    } as historyProps;


})
export const historyStore = createSlice({
    name: 'history',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchHistorys.fulfilled, (state, action) => {
                state.historys = action.payload
            })
            .addCase(createHistorys.fulfilled, (state, action) => {
                state.historys.push(action.payload)
            })
    },
})