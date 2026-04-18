import { userSchema } from "../validators/userValidator.js";

const userValidation = (req, res, next) => {
    //console.log('🧪 Validation middleware running for', req.method, req.originalUrl);
    //console.log('📦 Request body:', req.body);

    const { error } = userSchema.validate(req.body, {
        abortEarly: false
    })

    if (error) {
        //console.log('❌ Validation failed:', error.details.map(err => err.message));

        return res.status(400).json({
            message: 'Validation Failed',
            errors: error.details.map(err => err.message)
        })
    }

    //console.log('✅ Validation passed');
    next();
}

export default userValidation;