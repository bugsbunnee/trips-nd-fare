import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginUser } from "./actions";
import { User } from "@/utils/models";
import { AppDispatch } from "..";
import storage from "@/utils/storage";

interface AuthState {
    error: string;
    isAuthenticating: boolean;
    user: User | null;
}

const initialState: AuthState = {
    error: '',
    isAuthenticating: false,
    user: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.isAuthenticating = true;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.user = action.payload as User;
            state.isAuthenticating = false;
        })
        .addCase(loginUser.rejected, (state, action) => {
            if (action.error && action.error.message) state.error = action.error.message;
            state.isAuthenticating = false;
        });
    }
});

export const logout = () => async (dispatch: AppDispatch) => {
    dispatch(setUser(null));
    await storage.removeUser();
};

export const { setUser } = authSlice.actions;
export default authSlice.reducer;