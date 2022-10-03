import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { IAuthorizedUserState } from '../types/types';

type authorizedUserState = {
    user: {
        accessToken: string,
        user: {
            email: string,
            id: number
        }
    }
}

const initialState: authorizedUserState = {
    user: {
        accessToken: '',
        user: {
            email: '',
            id: 0
        }
    }
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsAuth(state, action: PayloadAction<IAuthorizedUserState>) {
                state.user.accessToken = action.payload.accessToken
                state.user.user.email = action.payload.user.email
                state.user.user.id = action.payload.user.id
        },
    }
})

export const {setIsAuth} = authSlice.actions;
export default authSlice.reducer;