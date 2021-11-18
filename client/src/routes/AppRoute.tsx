import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import { useAppSelector } from '../store';
import { UserRoles } from '../types/Auth';

interface Props extends RouteProps {
	onlyFor: UserRoles,
	redirectPath: string,
}

const AppRoute: React.FC<Props> = ({
	component, path, onlyFor, redirectPath,
}) => {
	const { user } = useAppSelector((state) => state.auth);

	switch (onlyFor) {
		case UserRoles.USER:
			return user ? <Route path={path} exact component={component} /> : <Redirect to={redirectPath} />;
		case UserRoles.ANONYM:
			return !user ? <Route path={path} exact component={component} /> : <Redirect to={redirectPath} />;
		default: return <Route path={path} exact component={component} />;
	}
};

export default AppRoute;
