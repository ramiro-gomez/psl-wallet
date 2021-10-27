import Joi from 'joi';

const conceptSchema = Joi.string().trim();
const typeSchema = Joi.string().valid('Inflow', 'Outflow');
const amountSchema = Joi.number().greater(0);
const categorySchema = Joi.string().valid('Food', 'Transport', 'Services', 'Clothing', 'Other');
const dateSchema = Joi.date().iso().min('1970-01-01 00:00:00').max('now');

export const addActivitySchema = Joi.object({
	concept: conceptSchema.required(),
	type: typeSchema.required(),
	amount: amountSchema.required(),
	category: categorySchema.required(),
	date: dateSchema.required(),
});

export const editActivitySchema = Joi.object({
	concept: conceptSchema,
	type: typeSchema,
	amount: amountSchema,
	category: categorySchema,
	date: dateSchema,
}).min(1);
