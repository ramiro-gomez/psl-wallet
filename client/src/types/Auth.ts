export interface User {
	name: string,
	email: string,
	accessToken: string
}
export enum UserRoles {
	USER,
	ANONYM
}

export interface LogInProps {
	email: string,
	password: string
}
export interface RegisterProps {
	name: string,
	email: string,
	password: string,
	repeatPassword: string,
}
