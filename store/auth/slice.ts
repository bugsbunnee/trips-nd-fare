import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthResponse, loginUser, registerUser } from "./actions";
import { User } from "@/utils/models";
import { AppDispatch } from "..";
import storage from "@/utils/storage";
import { getMessageFromError } from "@/utils/lib";

interface AuthState {
    error: string;
    isInitializing: boolean;
    isAuthenticating: boolean;
    token: string;
    user: User | null;
}

const initialState: AuthState = {
    error: '',
    isInitializing: true,
    isAuthenticating: false,
    token: '',
    user: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setInitializing: (state, action: PayloadAction<boolean>) => {
            state.isInitializing = action.payload
        },
        setSession: (state, action: PayloadAction<AuthResponse>) => {
            state.user = action.payload.account;
            state.token = action.payload.token;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.isAuthenticating = true;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.token = action.payload!.token;
            state.user = action.payload!.account;
            state.isAuthenticating = false;
            state.error = '';
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.isAuthenticating = false;
            state.error = getMessageFromError(action.payload);
        })
        .addCase(registerUser.pending, (state) => {
            state.isAuthenticating = true;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.token = action.payload!.token;
            state.user = action.payload!.account;
            state.isAuthenticating = false;
            state.error = '';
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.isAuthenticating = false;
            state.error = getMessageFromError(action.payload);
        });
    }
});

export const logout = () => async (dispatch: AppDispatch) => {
    dispatch(setSession({ token: '', account: null }));
    await storage.removeUser();
};

export const { setInitializing, setSession } = authSlice.actions;
export default authSlice.reducer;