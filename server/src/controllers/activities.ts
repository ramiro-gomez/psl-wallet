import { Request, Response } from 'express';
import { ResultSetHeader } from 'mysql2';
import { StatusCodes } from 'http-status-codes';
import pool from '../db';
import ActivitySchema from '../models/Activity';
import ApiError from '../errors/ApiError';

export const getActivities = async (req: Request, res: Response) => {
	const limit = req.query.limit ? `LIMIT ${req.query.limit}` : '';
	const [activities] = await pool.query(`SELECT * FROM activity ORDER BY date DESC ${limit}`);
	res.status(StatusCodes.OK).json({ activities });
};
export const addActivity = async (req: Request, res: Response) => {
	const { error, value } = ActivitySchema.validate(req.body);
	if (error) throw new ApiError(StatusCodes.BAD_REQUEST, error.message);
	const [result] = await pool.query('INSERT INTO activity set ?', value) as [ResultSetHeader, any];
	res.status(StatusCodes.CREATED).json({
		id: result.insertId,
		...value,
	});
};
export const editActivity = async (req: Request, res: Response) => {
	const id = Number(req.params.id);
	if (!id) throw new ApiError(StatusCodes.BAD_REQUEST, `"${req.params.id}" is not a valid activity id`);
	const { error, value } = ActivitySchema.validate(req.body);
	if (error) throw new ApiError(StatusCodes.BAD_REQUEST, error.message);
	await pool.query('UPDATE activity SET ? WHERE id = ?', [value, id]);
	res.status(StatusCodes.OK).json({ ...value });
};
export const deleteActivity = async (req: Request, res: Response) => {
	const id = Number(req.params.id);
	if (!id) throw new ApiError(StatusCodes.BAD_REQUEST, `"${req.params.id}" is not a valid activity id`);
	const [result] = await pool.query('DELETE FROM activity WHERE id = ?', [id]) as [ResultSetHeader, any];
	if (!result.affectedRows) throw new ApiError(StatusCodes.BAD_REQUEST, `Activity with id ${id} doesn't exist`);
	res.status(StatusCodes.OK).send();
};
