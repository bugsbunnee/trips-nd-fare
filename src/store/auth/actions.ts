import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { User } from '@/src/utils/models';
import { RootState } from '..';

import http from '@/src/api/http';

export const loginAction = createAction<number | undefined>('auth/login')
export const loginGoogleAction = createAction<number | undefined>('auth/loginGoogle')
export const registerAction = createAction<number | undefined>('auth/register');
export const updateLocationAction = createAction<number | undefined>('auth/updateLocation');
export const verifyEmailAction = createAction<number>('auth/verifyEmail');
export const forgotPasswordAction = createAction<number>('auth/forgotPassword');
export const resetPasswordAction = createAction<number>('auth/resetPassword');

export interface AuthResponse {
    token: string;
    account: User | null;
}

interface VerifyEmailPayload {
    email: string;
    token: string;
}

interface ForgotPasswordPayload {
    email: string;
}

interface ResetPasswordPayload {
    password: string;
    confirmPassword: string;
}

export const loginUser = createAsyncThunk(loginAction.type, async (authData: { email: string, password: string }, thunkAPI) => {
    const response = await http.post<AuthResponse>('/auth/login', authData);
    if (response.ok) return response.data;

    return thunkAPI.rejectWithValue(response.originalError);
});

export const loginWithGoogle = createAsyncThunk(loginGoogleAction.type, async (token: string, thunkAPI) => {
    const response = await http.post<AuthResponse>('/auth/google', { token });
    if (response.ok) return response.data;

    return thunkAPI.rejectWithValue(response.originalError);
});

export const registerUser = createAsyncThunk(registerAction.type, async (authData: { name: string, email: string, password: string }, thunkAPI) => {
    const response = await http.post<AuthResponse>('/users', authData);
    if (response.ok) return response.data;

    return thunkAPI.rejectWithValue(response.originalError);
});

export const updateUser = createAsyncThunk(updateLocationAction.type, async (authData: FormData, thunkAPI) => {
    const config = {
        headers: {
            'x-auth-token': (thunkAPI.getState() as RootState).auth.token,
            'Content-Type': 'multipart/form-data',
        },
    };

    const response = await http.put<AuthResponse>('/users/me/profile', authData, config);
    if (response.ok) return response.data;

    return thunkAPI.rejectWithValue(response.originalError);
});

export const verifyEmail = createAsyncThunk(verifyEmailAction.type, async (payload: VerifyEmailPayload, thunkAPI) => {
    const response = await http.post('/auth/verify', payload);
    if (response.ok) return response.data;

    return thunkAPI.rejectWithValue(response.originalError);
});

export const forgotPassword = createAsyncThunk(forgotPasswordAction.type, async (payload: ForgotPasswordPayload, thunkAPI) => {
    const response = await http.post('/auth/forgot-password', payload);
    if (response.ok) return response.data;

    return thunkAPI.rejectWithValue(response.originalError);
});

export const resetPassword = createAsyncThunk(resetPasswordAction.type, async (passwordDetails: ResetPasswordPayload, thunkAPI) => {
    const details = (thunkAPI.getState() as RootState).auth.passwordResetDetails;
    const payload = {
        password: passwordDetails.password,
        confirmPassword: passwordDetails.confirmPassword,
        email: details.email,
        token: details.code,
    };

    const response = await http.post('/auth/reset-password', payload);
    if (response.ok) return response.data;

    return thunkAPI.rejectWithValue(response.originalError);
});


