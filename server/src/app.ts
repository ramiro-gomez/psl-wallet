/* eslint-disable import/first */
require('dotenv').config();

import express from 'express';
import 'express-async-errors';
import pool from './db';
import activitiesRouter from './routes/activities';
import errorHandlerMiddleware from './middleware/error-handler';

const app = express();

app.use(express.json());

app.use('/api/v1/activities', activitiesRouter);

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
(async () => {
	try {
		await pool.getConnection();
		console.log('DB connected');
		app.listen(port, () => console.log(`Server listening on port ${port}`));
	} catch (error) {
		console.error(error);
	}
})();
