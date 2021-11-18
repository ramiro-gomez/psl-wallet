import jwtDecode from 'jwt-decode';
import { User } from '../types/Auth';

export const lsToken = 'jwt';

export const decodeUserFromJWT = (token: string): User => {
	const data = jwtDecode<User>(token);
	return ({
		name: data.name,
		email: data.email,
		accessToken: token,
	});
};
