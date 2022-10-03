import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import contactsSlice from './contactSlice'

const store = configureStore({
    reducer: {
        contacts: contactsSlice,
        auth: authSlice
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch