import { createAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { collection, doc, addDoc, getDocs, updateDoc, setDoc, where } from "firebase/firestore";
import { FirebaseConfig } from "src/firebase/configs";

const db = FirebaseConfig.getInstance().fbDB
type serviceProps = {
    id?: string
    serviceID: string;
    serviceName: string;
    serviceStatus: boolean
    description: string
    Growauto?: number | string[]
    CreateAt: string
    Prefix?: string | number
    Surfix?: string | number
    Reset?: boolean | number
};

interface Services {
    services: serviceProps[]
}
const initialState: Services = {
    services: []
}

export const fetchServices = createAsyncThunk("newdevice/fetchservices", async (thunkAPI) => {
    let services: Array<undefined | object> = [];
    const q = collection(db, "services");

    const querySnapshot = await getDocs(q);

    let id: string
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        id = doc.id
        services.push({ id, ...doc.data() });
    });

    return services as Array<serviceProps>;
})


export const createService = createAsyncThunk("serviceStore/createservice", async (body: Omit<serviceProps, 'id'>, thunkAPI) => {
    addDoc(collection(db, 'services'), {
        ...body
    })
    return {

        ...body,
    } as serviceProps;
})

export const updateService = createAsyncThunk("serviceStore/updateservice", async ({ idService, body }: { idService: string, body: serviceProps }, thunkAPI) => {
    const serviceNeedUpdate = doc(db, "services", idService);
    updateDoc(serviceNeedUpdate, { ...body })
    return {
        ...body,
    } as serviceProps;
})
export const serviceStore = createSlice({
    name: "serviceStore",
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(fetchServices.fulfilled, (state, action) => {
                state.services = action.payload
            })
            .addCase(createService.fulfilled, (state, action) => {
                state.services.push(action.payload)
            })
            .addCase(updateService.fulfilled, (state, action) => {
                state.services.find((service, index) => {
                    if (service.id === action.payload.id) {
                        state.services[index] = action.payload
                        return true
                    }
                    return false
                })
            })
    },
});