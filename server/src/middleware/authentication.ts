import { Express, NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import ApiError from '../errors/ApiError';

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) throw new Error('JWT_SECRET not found');

const authenticationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	const { authorization } = req.headers;
	if (!authorization || !authorization.startsWith('Bearer ')) throw new ApiError(StatusCodes.UNAUTHORIZED, 'No token provided');
	const token = authorization.split(' ')[1];
	try {
		req.user = jwt.verify(token, jwtSecret) as Express.UserPayload;
		next();
	} catch (error) {
		throw new ApiError(StatusCodes.UNAUTHORIZED, 'Not authorized to access this route');
	}
};

export default authenticationMiddleware;
