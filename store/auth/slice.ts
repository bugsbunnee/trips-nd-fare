import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AuthResponse, loginUser, loginWithGoogle, registerUser, updateUser, verifyEmail } from "./actions";
import { User } from "@/utils/models";
import { getMessageFromError } from "@/utils/lib";
import { AppDispatch } from "..";
import { updateDeviceToken } from "../data/actions";

import storage from "@/utils/storage";

interface Auth {
    token: string;
    user: User | null;
}

interface AuthState extends Auth {
    error: string;
    isVerified: boolean;
    isInitializing: boolean;
    isAuthenticating: boolean;
    waitingRoom: Auth | null;
}

const initialState: AuthState = {
    error: '',
    isInitializing: true,
    isVerified: false,
    isAuthenticating: false,
    token: '',
    user: null,
    waitingRoom: null,
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
        setBoardUser: (state) => {
            if (state.waitingRoom) {
                state.user = state.waitingRoom.user;
                state.token = state.waitingRoom.token;
                state.waitingRoom = null;
                state.isVerified = false;
            }
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
        .addCase(loginWithGoogle.pending, (state) => {
            state.isAuthenticating = true;
        })
        .addCase(loginWithGoogle.fulfilled, (state, action) => {
            state.token = action.payload!.token;
            state.user = action.payload!.account;
            state.isAuthenticating = false;
            state.error = '';
        })
        .addCase(loginWithGoogle.rejected, (state, action) => {
            state.isAuthenticating = false;
            state.error = getMessageFromError(action.payload);
        })
        .addCase(registerUser.pending, (state) => {
            state.isAuthenticating = true;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.error = '';
            state.isAuthenticating = false;
            state.waitingRoom = {
                token: action.payload!.token,
                user: action.payload!.account!,
            };
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.isAuthenticating = false;
            state.error = getMessageFromError(action.payload);
        })
        .addCase(updateUser.pending, (state) => {
            state.isAuthenticating = true;
        })
        .addCase(updateUser.fulfilled, (state, action) => {
            state.token = action.payload!.token;
            state.user = action.payload!.account;
            state.isAuthenticating = false;
            state.error = '';
        })
        .addCase(updateUser.rejected, (state, action) => {
            state.isAuthenticating = false;
            state.error = getMessageFromError(action.payload);
        })
        .addCase(verifyEmail.pending, (state) => {
            state.isAuthenticating = true;
        })
        .addCase(verifyEmail.fulfilled, (state) => {
            state.isAuthenticating = false;
            state.isVerified = true;
            state.error = '';
        })
        .addCase(verifyEmail.rejected, (state, action) => {
            state.isAuthenticating = false;
            state.error = getMessageFromError(action.payload);
        })
        .addCase(updateDeviceToken.fulfilled, (state, action) => {
            state.token = action.payload!.token;
            state.user = action.payload!.account;
            state.isAuthenticating = false;
            state.error = '';
        })
    },
});

export const logout = () => async (dispatch: AppDispatch) => {
    dispatch(setSession({ token: '', account: null }));
    await storage.removeUser();
};

export const { setBoardUser, setInitializing, setSession } = authSlice.actions;
export default authSlice.reducer;