/* eslint-disable import/first */
require('dotenv').config();

import express from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import xss from 'xss-clean';
import cors from 'cors';
import rateLimiter from 'express-rate-limit';
import path from 'path';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';
import pool from './db';
import activitiesRouter from './routes/activities';
import authenticationRouter from './routes/auth';
import errorHandlerMiddleware from './middleware/error-handler';
import authenticationMiddleware from './middleware/authentication';

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../swagger.yaml'));

app.set('trust proxy', 1);
app.use(rateLimiter({
	windowMs: 5 * 60 * 1000, // 5 minutes
	max: 100, // limit each IP to 100 requests per windowMs
}));
app.use(express.json());
app.use(helmet({
	contentSecurityPolicy: {
		directives: {
			'default-src': ["'self'", "'unsafe-inline'", 'https:', 'data:'],
		},
	},
}));
app.use(cors());
app.use(xss());

app.use('/', express.static(path.join(__dirname, '../../client/build/')));
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/api/v1/auth', authenticationRouter);
app.use('/api/v1/activities', authenticationMiddleware, activitiesRouter);

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
