import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ResetPasswordType {
    email: string
}
const initialState: ResetPasswordType = {
    email: ''
}

export const ResetPasswordStore = createSlice({
    name: 'reset_password',
    initialState,
    reducers: {
        emailNeedChangePassword: (state, action: PayloadAction<string>) => {
            state.email = action.payload
        }
    },
    extraReducers: {}
})

export const { emailNeedChangePassword } = ResetPasswordStore.actions