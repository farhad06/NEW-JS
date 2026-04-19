import { userSchema } from "../validators/userValidator.js";

const userValidation = (req, res, next) => {

    const { error } = userSchema.validate(req.body, {
        abortEarly: false
    })

    if (error) {
        return res.status(400).json({
            message: 'Validation Failed',
            errors: error.details.map(err => err.message)
        })
    }

    next();
}

export default userValidation;