import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AuthResponse, forgotPassword, loginUser, loginWithGoogle, registerUser, resetPassword, updateUser, verifyEmail } from "@/src/store/auth/actions";
import { User, Wallet } from "@/src/utils/models";
import { getMessageFromError } from "@/src/utils/lib";
import { AppDispatch } from "..";
import { createVirtualAccount, updateDeviceToken, updateVirtualAccount } from "@/src/store/data/actions";

import storage from "@/src/utils/storage";

interface Auth {
    token: string;
    chat: string;
    user: User | null;
    wallet: Wallet | null;
}

interface PasswordResetDetails {
    error: string;
    email: string;
    code: string;
    active: boolean;
};

interface AuthState extends Auth {
    error: string;
    isVerified: boolean;
    isInitializing: boolean;
    isAuthenticating: boolean;
    waitingRoom: Auth | null;
    passwordResetDetails: PasswordResetDetails;
}

const initialState: AuthState = {
    error: '',
    chat: '',
    isInitializing: true,
    isVerified: false,
    isAuthenticating: false,
    token: '',
    wallet: null,
    user: null,
    passwordResetDetails: { error: '', email: '', code: '', active: false, },
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
            state.chat = action.payload.chat;
            state.wallet = action.payload.wallet;
        },
        setBoardUser: (state) => {
            if (state.waitingRoom) {
                state.user = state.waitingRoom.user;
                state.token = state.waitingRoom.token;
                state.chat = state.waitingRoom.chat;
                state.wallet = state.waitingRoom.wallet;
                state.waitingRoom = null;
                state.isVerified = false;
            }
        },
        setPasswordResetCode: (state, action: PayloadAction<string>) => {
            state.passwordResetDetails.code = action.payload;
            state.passwordResetDetails.active = false;
        },
        setCancelPasswordReset: (state) => {
            state.passwordResetDetails = { error: '', email: '', code: '', active: false, };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.isAuthenticating = true;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.token = action.payload!.token;
            state.user = action.payload!.account;
            state.chat = action.payload!.chat;
            state.wallet = action.payload!.wallet;
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
        .addCase(createVirtualAccount.fulfilled, (state, action) => {
            state.token = action.payload!.token;
            state.user = action.payload!.account;
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
                chat: action.payload!.chat,
                token: action.payload!.token,
                user: action.payload!.account!,
                wallet: action.payload!.wallet,
            };
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.isAuthenticating = false;
            state.error = getMessageFromError(action.payload);
        })
        .addCase(forgotPassword.pending, (state) => {
            state.isAuthenticating = true;
            state.passwordResetDetails.error = '';
        })
        .addCase(forgotPassword.fulfilled, (state, action) => {
            state.error = '';
            state.isAuthenticating = false;
            state.passwordResetDetails = {
                error: '',
                active: true,
                email: action.meta.arg.email,
                code: '',
            };
        })
        .addCase(forgotPassword.rejected, (state, action) => {
            state.isAuthenticating = false;
            state.passwordResetDetails.error = getMessageFromError(action.payload);
        })
        .addCase(resetPassword.pending, (state) => {
            state.isAuthenticating = true;
            state.passwordResetDetails.error = '';
        })
        .addCase(resetPassword.fulfilled, (state, action) => {
            state.isAuthenticating = false;
            state.passwordResetDetails = {
                error: '',
                active: false,
                email: '',
                code: '',
            };
        })
        .addCase(resetPassword.rejected, (state, action) => {
            state.isAuthenticating = false;
            state.passwordResetDetails.error = getMessageFromError(action.payload);
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
        .addCase(updateVirtualAccount.fulfilled, (state, action) => {
            state.wallet = action.payload!;
        })
    },
});

export const logout = () => async (dispatch: AppDispatch) => {
    dispatch(setSession({ token: '', chat: '', account: null, wallet: null }));
    await storage.removeUser();
};

export const { setBoardUser, setInitializing, setPasswordResetCode, setCancelPasswordReset, setSession } = authSlice.actions;
export default authSlice.reducer;