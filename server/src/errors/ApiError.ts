import { StatusCodes } from 'http-status-codes';

class ApiError extends Error {
	statusCode: StatusCodes;

	constructor(statusCode: StatusCodes, message: string) {
		super(message);
		this.statusCode = statusCode;
	}
}

export default ApiError;
