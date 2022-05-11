const Joi = require('@hapi/joi').extend(require('@joi/date'))

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

export const gameValidation = (body) => {
    const schema = Joi.object({
        title: Joi.string()
            .required(),
        genres: Joi.array()
            .required(),
        developer: Joi.string()
            .required(),
        publisher: Joi.array()
            .required(),
        releseDate: Joi.date()
            .required(),
    })

    return schema.validate(body)
}