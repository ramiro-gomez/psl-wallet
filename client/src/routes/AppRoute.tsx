import { FC } from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import { useAppSelector } from '../store';
import { UserRoles } from '../types/Auth';

interface Props extends RouteProps {
	onlyFor: UserRoles,
	redirectPath: string,
}

const AppRoute: FC<Props> = ({
	component, path, onlyFor, redirectPath,
}) => {
	const { user } = useAppSelector((state) => state.auth);

	const RoleConditions = {
		[UserRoles.USER]: Boolean(user),
		[UserRoles.ANONYM]: !user,
	};

	return RoleConditions[onlyFor] ? <Route path={path} exact component={component} /> : <Redirect to={redirectPath} />;
};

export default AppRoute;
