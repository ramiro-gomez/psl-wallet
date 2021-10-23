import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../errors/ApiError';

const errorHandlerMiddleware = (error: any, req: Request, res: Response, next: NextFunction) => {
	if (error instanceof ApiError) {
		res.status(error.statusCode).json({ message: error.message });
	} else {
		console.error(error);
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message: 'Something went wrong, please try again later',
		});
	}
	next();
};

export default errorHandlerMiddleware;
