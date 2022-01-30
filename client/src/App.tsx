import { HashRouter, Switch } from 'react-router-dom';
import 'materialize-css';
import { useEffect, useState } from 'react';
import { ProgressBar } from 'react-materialize';
import Home from './views/Home';
import Register from './views/Register';
import Login from './views/Login';
import Activities from './views/Activities';
import Edit from './views/Edit';
import { UserRoles } from './types/Auth';
import AppRoute from './routes/AppRoute';
import { useAppDispatch, useAppSelector } from './store';
import Create from './views/Create';
import { getActivities } from './store/reducers/activitiesReducer';

const App = () => {
	const { user } = useAppSelector((state) => state.auth);
	const dispatch = useAppDispatch();
	const [isLoadingActivities, setIsLoadingActivities] = useState(false);

	useEffect(() => {
		if (user) {
			(async () => {
				setIsLoadingActivities(true);
				const { type } = await dispatch(getActivities({ token: user.accessToken }));
				if (type.includes('fulfilled')) {
					setIsLoadingActivities(false);
				}
			})();
		}
	}, [user]);

	return isLoadingActivities ? (
		<div className="loader-wrapper container valign-wrapper">
			<ProgressBar />
		</div>
	) : (
		<div className="custom-container">
			<HashRouter>
				<Switch>
					<AppRoute path="/" exact component={Home} onlyFor={UserRoles.USER} redirectPath="/login" />
					<AppRoute path="/activities" exact component={Activities} onlyFor={UserRoles.USER} redirectPath="/login" />
					<AppRoute path="/create" exact component={Create} onlyFor={UserRoles.USER} redirectPath="/login" />
					<AppRoute path="/edit/:id" exact component={Edit} onlyFor={UserRoles.USER} redirectPath="/login" />
					<AppRoute path="/login" exact component={Login} onlyFor={UserRoles.ANONYM} redirectPath="/" />
					<AppRoute path="/register" exact component={Register} onlyFor={UserRoles.ANONYM} redirectPath="/" />
				</Switch>
			</HashRouter>
		</div>
	);
};

export default App;
