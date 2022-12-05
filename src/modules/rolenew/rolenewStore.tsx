import { async } from "@firebase/util";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, doc, addDoc, getDocs, updateDoc, setDoc, where } from "firebase/firestore";
import { FirebaseConfig } from "src/firebase/configs";
import { useState, useEffect } from "react";
import { device } from "@assets/svg";
const db = FirebaseConfig.getInstance().fbDB
export interface roleType {
    id?: string
    name: string
    description: string
    permitViewDevice: boolean
    permitDetailDevice: boolean
    permitAddDevice: boolean
    permitUpdateDevice: boolean

    permitViewService: boolean
    permitAddService: boolean
    permitDetailService: boolean
    permitUpdateService: boolean

    permitViewNumber: boolean
    permitDetailNumber: boolean
    permitAddNumber: boolean

    permitViewReport: boolean

    permitViewRole: boolean
    permitAddRole: boolean
    permitUpdateRole: boolean

    permitViewAccount: boolean
    permitAddAccount: boolean
    permitUpdateAccount: boolean

    permitViewHistory: boolean
}

interface Roles {
    roles: roleType[]
}

const initialState: Roles = {
    roles: []
}

export const fetchRoles = createAsyncThunk("roles/fetchroles", async (thunkAPI) => {
    let roles: Array<undefined | object> = [];
    const q = collection(db, "roles");

    const querySnapshot = await getDocs(q);

    let id: string
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        id = doc.id
        roles.push({ id, ...doc.data() });
    });

    return roles as Array<roleType>;
})

export const createRoles = createAsyncThunk("roles/createroles", async (body: Omit<roleType, 'id'>, thunkAPI) => {
    addDoc(collection(db, 'roles'), {
        ...body
    })
    return {
        ...body,
    } as roleType;


})
export const updateRoles = createAsyncThunk("roles/updateroles", async ({ idRole, body }: { idRole: string, body: roleType }, thunkAPI) => {
    const deviceNeedUpdate = doc(db, "roles", idRole);
    updateDoc(deviceNeedUpdate, { ...body })
    return {
        ...body,
    } as roleType;
})
export const RoleNewStore = createSlice({
    name: 'roles',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchRoles.fulfilled, (state, action) => {
                state.roles = action.payload
            })
            .addCase(createRoles.fulfilled, (state, action) => {
                state.roles.push(action.payload)
            })
            .addCase(updateRoles.fulfilled, (state, action) => {
                state.roles.find((role, index) => {
                    if (role.id === action.payload.id) {
                        state.roles[index] = action.payload
                        return true
                    }
                    return false
                })
            })
    },
})