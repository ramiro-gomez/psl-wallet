/* eslint-disable import/first */
import * as dotenv from 'dotenv';

dotenv.config();
import express from 'express';
import activitiesRouter from './routes/activities';
import pool from './db/pool';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use('/api/v1/activities', activitiesRouter);

(async () => {
	try {
		await pool.getConnection();
		console.log('DB is Connected');
		app.listen(port, () => console.log(`Server listening on port ${port}`));
	} catch (error) {
		console.log(error);
	}
})();
