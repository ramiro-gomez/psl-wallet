import { Request, Response } from 'express';
import { ResultSetHeader } from 'mysql2';
import { StatusCodes } from 'http-status-codes';
import pool from '../db/pool';

export const getActivities = async (req: Request, res: Response) => {
	const limit = req.query.limit ? `LIMIT ${req.query.limit}` : '';
	const [activities] = await pool.query(`SELECT * FROM activity ${limit}`);
	res.status(StatusCodes.OK).json({ activities });
};
export const addActivity = async (req: Request, res: Response) => {
	const { concept, type, amount, category, date } = req.body;
	const newActivity = { concept, type, amount, category, date };
	const [result] = await pool.query('INSERT INTO activity set ?', newActivity) as [ResultSetHeader, any];
	res.status(StatusCodes.CREATED).json({
		id: result.insertId,
		...newActivity,
	});
};
export const editActivity = async (req: Request, res: Response) => {
	const { concept, type, amount, category, date } = req.body;
	const newActivity = { concept, type, amount, category, date };
	const id = parseInt(req.params.id, 10);
	await pool.query('UPDATE activity SET ? WHERE id = ?', [newActivity, id]);
	res.status(StatusCodes.OK).json({ ...newActivity });
};
export const deleteActivity = async (req: Request, res: Response) => {
	const id = parseInt(req.params.id, 10);
	await pool.query('DELETE FROM activity WHERE id = ?', [id]);
	res.status(StatusCodes.OK).send();
};
