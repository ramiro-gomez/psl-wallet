import Joi from 'joi';

const ActivitySchema = Joi.object({
	concept: Joi.string().trim().required(),
	type: Joi.string().valid('Inflow', 'Outflow').required(),
	amount: Joi.number().greater(0).required().required(),
	category: Joi.string().valid('Food', 'Transport', 'Services', 'Clothing', 'Other').required(),
	date: Joi.date().iso().min('1970-01-01 00:00:00').max('now').required(),
});

export default ActivitySchema;
