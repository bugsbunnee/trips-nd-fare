import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { User } from '@/utils/models';

import http from '@/api/http';

export const loginAction = createAction<number | undefined>('auth/login')
export const registerTokenAction = createAction<number | undefined>('auth/registerToken');

export const loginUser = createAsyncThunk(loginAction.type, async (authData: { email: string, password: string}, thunkAPI) => {
    const response = await http.post<User>('/posts', authData);
    if (response.ok) return response.data;

    return thunkAPI.rejectWithValue(response.originalError.message);
});


