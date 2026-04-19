import Joi from "joi";

export const userSchema = Joi.object({
    first_name: Joi.string().min(2).max(50).required(),
    last_name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().max(80).optional(),
    age: Joi.number().integer().min(1).optional(),
    password: Joi.string().min(6).required(),
})