declare namespace Express {
	interface UserPayload {
		name: string,
		email: string,
	}
	export interface Request {
		user?: UserPayload,
	}
}
