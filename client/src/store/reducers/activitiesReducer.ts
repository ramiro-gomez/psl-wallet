import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import {
	Activity, ActivityTypes, AddActivityProps, DeleteActivityProps, EditActivityProps, GetActivitiesProps,
} from '../../types/Activity';

interface ActivitiesState {
	activityList: Activity[],
	balance: number,
	errorMessage: string|null
}
const initialState: ActivitiesState = {
	activityList: [],
	balance: 0,
	errorMessage: null,
};

const authHeader = (token: string) => ({
	headers: {
		Authorization: `Bearer ${token}`,
	},
});

export const getActivities = createAsyncThunk<Activity[], GetActivitiesProps>(
	'activities/getActivities',
	async ({ token }) => {
		try {
			const { data: { activities } } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/activities`, authHeader(token)) as AxiosResponse<{ activities: Activity[] }>;
			return activities;
		} catch (err: any) {
			return [];
		}
	},
);
export const addActivity = createAsyncThunk<Activity, AddActivityProps, { rejectValue: string }>(
	'activities/addActivity',
	async ({ token, activity }, { rejectWithValue }) => {
		try {
			const { data } = await axios.post<Activity>(`${process.env.REACT_APP_API_URL}/api/v1/activities`, activity, authHeader(token));
			return data;
		} catch (err: any) {
			if (err.response.data.message) return rejectWithValue(err.response.data.message as string);
			return rejectWithValue('Something wen\'t wrong, please try again later');
		}
	},
);
export const editActivity = createAsyncThunk<Activity, EditActivityProps, { rejectValue: string }>(
	'activities/editActivity',
	async ({ token, activity }, { rejectWithValue }) => {
		try {
			const {
				concept, type, amount, category, date,
			} = activity;
			await axios.patch(`${process.env.REACT_APP_API_URL}/api/v1/activities/${activity.id}`, {
				concept, type, amount, category, date,
			}, authHeader(token));
			return activity;
		} catch (err: any) {
			if (err.response.data.message) return rejectWithValue(err.response.data.message as string);
			return rejectWithValue('Something wen\'t wrong, please try again later');
		}
	},
);
export const deleteActivity = createAsyncThunk<number, DeleteActivityProps>(
	'activities/deleteActivity',
	async ({ token, activityID }) => {
		await axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/activities/${activityID}`, authHeader(token));
		return activityID;
	},
);

const sortActivitiesByDate = (activityList: Activity[]) => activityList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
const getAmountWithSign = (amount: number, type: ActivityTypes) => (type === ActivityTypes.OUTFLOW ? -amount : amount);
const sumAllAmounts = (activityList: Activity[]) => activityList.reduce((acc, { amount, type }) => acc + getAmountWithSign(amount, type), 0);

const activitiesSlice = createSlice({
	name: 'activities',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getActivities.fulfilled, (_state, { payload }) => ({
			activityList: sortActivitiesByDate(payload),
			balance: sumAllAmounts(payload),
			errorMessage: null,
		}));
		builder.addCase(getActivities.pending, (state) => ({
			...state,
			errorMessage: null,
		}));
		builder.addCase(addActivity.fulfilled, ({ activityList, balance }, { payload }) => ({
			balance: balance + getAmountWithSign(payload.amount, payload.type),
			activityList: sortActivitiesByDate([...activityList, payload]),
			errorMessage: null,
		}));
		builder.addCase(addActivity.rejected, (state, { payload }) => ({
			...state,
			errorMessage: payload || 'Internal error, please try again later',
		}));
		builder.addCase(editActivity.fulfilled, ({ activityList }, { payload }) => {
			const nActivityList = activityList.map((activity) => (activity.id === payload.id ? payload : activity));
			return {
				balance: sumAllAmounts(nActivityList),
				activityList: sortActivitiesByDate(nActivityList),
				errorMessage: null,
			};
		});
		builder.addCase(editActivity.rejected, (state, { payload }) => ({
			...state,
			errorMessage: payload || 'Internal error, please try again later',
		}));
		builder.addCase(deleteActivity.fulfilled, ({ activityList }, { payload }) => {
			const nActivityList = activityList.filter(({ id }) => id !== payload);
			return ({
				balance: sumAllAmounts(nActivityList),
				activityList: nActivityList,
				errorMessage: null,
			});
		});
	},
});

export default activitiesSlice.reducer;
