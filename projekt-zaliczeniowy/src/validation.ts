import Joi from '@hapi/joi'

export const registerValidation = (body) => {
    const schema = Joi.object({
        username: Joi.string()
                    .min(5)
                    .required(),
        email: Joi.string()
                    .required()
                    .email(),
        password: Joi.string()
                    .min(8)
                    .required(),
    })

    return schema.validate(body)
}

export const loginValidation = (body) => {
    const schema = Joi.object({
        username: Joi.string()
                    .min(5)
                    .required(),
        password: Joi.string()
                    .min(8)
                    .required(),
    })

    return schema.validate(body)
}