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
            .required()
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
            .required()
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
            .required()
    })

    return schema.validate(body)
}

export const genreValidation = (body) => {
    const schema = Joi.object({
        genName: Joi.string()
            .required()
    })

    return schema.validate(body)
}

export const developerValidation = (body) => {
    const schema = Joi.object({
        devName: Joi.string()
            .required(),
        founder: Joi.string()
    })

    return schema.validate(body)
}

export const publisherValidation = (body) => {
    const schema = Joi.object({
        pubName: Joi.string()
            .required()
    })

    return schema.validate(body)
}

// export const collectionValidation = (body) => {
//     const schema = Joi.object({
//         username: Joi.string()
//             .required(),
//         visable: Joi.string()
//             .default(false),
//         beaten: Joi.array(),
//         planned: Joi.array()
//     })

//     return schema.validate(body)
// }

export const beatenValidation = (body) => {
    const schema = Joi.object({
        beaten: Joi.string()
    })

    return schema.validate(body)
}

export const plannedValidation = (body) => {
    const schema = Joi.object({
        planned: Joi.string()
    })

    return schema.validate(body)
}