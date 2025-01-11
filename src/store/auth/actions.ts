import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { User } from '@/src/utils/models';
import { RootState } from '..';

import http from '@/src/api/http';

export const loginAction = createAction<number | undefined>('auth/login')
export const loginGoogleAction = createAction<number | undefined>('auth/loginGoogle')
export const registerAction = createAction<number | undefined>('auth/register');
export const updateLocationAction = createAction<number | undefined>('auth/updateLocation');
export const verifyEmailAction = createAction<number>('auth/verifyEmail');

export interface AuthResponse {
    token: string;
    account: User | null;
}

interface VerifyEmailPayload {
    email: string;
    token: string;
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


