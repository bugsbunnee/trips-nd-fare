import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { User } from '@/utils/models';

import http from '@/api/http';

export const loginAction = createAction<number | undefined>('auth/login')
export const registerAction = createAction<number | undefined>('auth/register');

export interface AuthResponse {
    token: string;
    account: User | null;
}

export const loginUser = createAsyncThunk(loginAction.type, async (authData: { email: string, password: string }, thunkAPI) => {
    const response = await http.post<AuthResponse>('/auth/login', authData);
    if (response.ok) return response.data;

    return thunkAPI.rejectWithValue(response.originalError);
});

export const registerUser = createAsyncThunk(registerAction.type, async (authData: { name: string, email: string, password: string }, thunkAPI) => {
    const response = await http.post<AuthResponse>('/users', authData);
    if (response.ok) return response.data;

    return thunkAPI.rejectWithValue(response.originalError);
});


