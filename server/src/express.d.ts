// eslint-disable-next-line no-unused-vars
declare namespace Express {
	interface UserPayload {
		name: string,
		email: string,
	}
	export interface Request {
		user?: UserPayload,
	}
}
