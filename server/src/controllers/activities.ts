import { Request, Response } from 'express';
import { FieldPacket, ResultSetHeader } from 'mysql2';
import { StatusCodes } from 'http-status-codes';
import pool from '../db';
import ApiError from '../errors/ApiError';
import { addActivitySchema, editActivitySchema } from '../validators/activity';

const validatePositiveNumber = (num: any, errorMsg: string) => {
	const result = Number(num);
	if (Number.isNaN(result) || result <= 0) throw new ApiError(StatusCodes.BAD_REQUEST, errorMsg);
	return result;
};

export const getActivities = async (req: Request, res: Response) => {
	if (!req.user) throw new Error('req.user doesn\'t exist');
	const [activities] = await pool.query('SELECT * FROM activity WHERE createdBy = ? ORDER BY date DESC', [req.user.email]);
	res.status(StatusCodes.OK).json({ activities });
};
export const addActivity = async (req: Request, res: Response) => {
	if (!req.user) throw new Error('req.user doesn\'t exist');
	const { error, value } = addActivitySchema.validate(req.body);
	if (error) throw new ApiError(StatusCodes.BAD_REQUEST, error.message);
	const newActivity = {
		...value,
		createdBy: req.user.email,
	};
	const [result] = await pool.query('INSERT INTO activity set ?', newActivity) as [ResultSetHeader, FieldPacket[]];
	res.status(StatusCodes.CREATED).json({
		...newActivity,
		id: result.insertId,
	});
};
export const editActivity = async (req: Request, res: Response) => {
	if (!req.user) throw new Error('req.user doesn\'t exist');
	const id = validatePositiveNumber(req.params.id, `"${req.params.id}" is not a valid activity id`);
	const createdBy = req.user.email;
	const { error, value } = editActivitySchema.validate(req.body);
	if (error) throw new ApiError(StatusCodes.BAD_REQUEST, error.message);
	const [result] = await pool.query('UPDATE activity SET ? WHERE id = ? AND createdBy = ?', [value, id, createdBy]) as [ResultSetHeader, FieldPacket[]];
	if (!result.affectedRows) throw new ApiError(StatusCodes.NOT_FOUND, `Activity with id ${id} doesn't exist or doesn't belong to you`);
	res.status(StatusCodes.NO_CONTENT).send();
};
export const deleteActivity = async (req: Request, res: Response) => {
	if (!req.user) throw new Error('req.user doesn\'t exist');
	const id = validatePositiveNumber(req.params.id, `"${req.params.id}" is not a valid activity id`);
	const [result] = await pool.query('DELETE FROM activity WHERE id = ? AND createdBy = ?', [id, req.user.email]) as [ResultSetHeader, any];
	if (!result.affectedRows) throw new ApiError(StatusCodes.NOT_FOUND, `Activity with id ${id} doesn't exist or doesn't belong to you`);
	res.status(StatusCodes.NO_CONTENT).send();
};
