import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { decodeUserFromJWT, lsToken } from '../../helpers/jwt';
import { LogInProps, RegisterProps, User } from '../../types/Auth';

const getStoredUser = () => {
	const token = localStorage.getItem(lsToken);
	if (!token) return;
	try {
		return decodeUserFromJWT(token);
	} catch (err: any) {
		localStorage.removeItem(lsToken);
	}
};

interface AuthState {
	user: User|null,
	errorMessage: string|null,
	isLoading: boolean,
}
const initialState: AuthState = {
	user: getStoredUser() || null,
	errorMessage: null,
	isLoading: false,
};

export const logIn = createAsyncThunk<User, LogInProps, { rejectValue: string }>(
	'auth/logIn',
	async ({ email, password }, { rejectWithValue }) => {
		try {
			const { data: { token } } = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/auth/login`, {
				email,
				password,
			});
			return decodeUserFromJWT(token);
		} catch (err: any) {
			if (err.response.data.message) return rejectWithValue(err.response.data.message as string);
			return rejectWithValue('Something wen\'t wrong, please try again later');
		}
	},
);
export const register = createAsyncThunk<User, RegisterProps, { rejectValue: string }>(
	'auth/register',
	async ({
		name, email, password, repeatPassword,
	}, { rejectWithValue }) => {
		try {
			const { data: { token } } = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/auth/register`, {
				name,
				email,
				password,
				repeatPassword,
			});
			return decodeUserFromJWT(token);
		} catch (err: any) {
			if (err.response.data.message) return rejectWithValue(err.response.data.message as string);
			return rejectWithValue('Something wen\'t wrong, please try again later');
		}
	},
);

const authPending = () => ({
	user: null,
	errorMessage: null,
	isLoading: true,
});
const authFulfilled = (user: User) => ({
	user,
	errorMessage: null,
	isLoading: false,
});
const authRejected = (errorMessage: string|undefined) => ({
	user: null,
	errorMessage: errorMessage || 'Something wen\'t wrong, please try again later',
	isLoading: false,
});

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logOut: () => ({
			user: null,
			errorMessage: null,
			isLoading: false,
		}),
	},
	extraReducers: (builder) => {
		builder.addCase(logIn.pending, () => authPending());
		builder.addCase(logIn.rejected, (_user, { payload }) => authRejected(payload));
		builder.addCase(logIn.fulfilled, (_user, { payload }) => authFulfilled(payload));

		builder.addCase(register.pending, () => authPending());
		builder.addCase(register.rejected, (_user, { payload }) => authRejected(payload));
		builder.addCase(register.fulfilled, (_user, { payload }) => authFulfilled(payload));
	},
});

export const { logOut } = authSlice.actions;
export default authSlice.reducer;
