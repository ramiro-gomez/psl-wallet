import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { lsToken } from '../helpers/jwt';
import activitiesReducer from './reducers/activitiesReducer';
import authReducer from './reducers/authReducer';

const store = configureStore({
	reducer: {
		auth: authReducer,
		activities: activitiesReducer,
	},
});

store.subscribe(() => {
	const { auth: { user } } = store.getState();
	if (user) {
		localStorage.setItem(lsToken, user.accessToken);
	} else {
		localStorage.removeItem(lsToken);
	}
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export default store;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
