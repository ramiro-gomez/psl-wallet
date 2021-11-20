import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { FieldPacket, RowDataPacket } from 'mysql2';
import pool from '../db';
import ApiError from '../errors/ApiError';
import { loginSchema, registerSchema } from '../validators/auth';

const jwtSecret = process.env.JWT_SECRET;
const jwtLifeTime = process.env.JWT_LIFETIME;
if (!jwtSecret) throw new Error('JWT_SECRET not found');
if (!jwtLifeTime) throw new Error('JWT_LIFETIME not found');

export const register = async (req: Request, res: Response) => {
	const { error, value: { email, name, password } } = registerSchema.validate(req.body);
	if (error) throw new ApiError(StatusCodes.BAD_REQUEST, error.message);
	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = {
			email,
			name,
			password: hashedPassword,
		};
		await pool.query('INSERT INTO user SET ?', [newUser]);
		const token = jwt.sign({
			email,
			name,
		}, jwtSecret, { expiresIn: jwtLifeTime });
		res.status(StatusCodes.CREATED).send({ token });
	} catch (err: any) {
		if (err.code === 'ER_DUP_ENTRY') throw new ApiError(StatusCodes.BAD_REQUEST, 'This email is already registered');
		throw err;
	}
};
export const login = async (req: Request, res: Response) => {
	const { error, value } = loginSchema.validate(req.body);
	if (error) throw new ApiError(StatusCodes.BAD_REQUEST, error.message);

	const [[user]] = await pool.query('SELECT * FROM user WHERE email = ?', [value.email]) as [RowDataPacket[], FieldPacket[]];
	if (!user) throw new ApiError(StatusCodes.UNAUTHORIZED, 'This email is not registered');

	const isPasswordCorrect = await bcrypt.compare(value.password, user.password);
	if (!isPasswordCorrect) throw new ApiError(StatusCodes.UNAUTHORIZED, 'Wrong password');

	const token = jwt.sign({
		email: user.email,
		name: user.name,
	}, jwtSecret, { expiresIn: jwtLifeTime });
	res.status(StatusCodes.OK).json({ token });
};
