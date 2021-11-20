import Joi from 'joi';

const emailSchema = Joi.string().email().required();

export const registerSchema = Joi.object({
	name: Joi.string().pattern(/^[a-zA-Z]*$/).max(20).trim().required().messages({ // Same max as in DB
		'string.pattern.base': 'Name can only contain letters',
	}),
	email: emailSchema,
	password: Joi.string().min(8).max(50).required(),
	repeatPassword: Joi.string().valid(Joi.ref('password')).required().messages({
		'any.only': 'Passwords must match',
	}),
});

export const loginSchema = Joi.object({
	email: emailSchema,
	password: Joi.string().required(),
});
