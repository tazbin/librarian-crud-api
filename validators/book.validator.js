// imports
const Joi = require('joi');

// defining book validation schemas
const bookSchema = Joi.object({

    title: Joi.string()
        .min(3)
        .max(30)
        .required(),

    author: Joi.string()
        .min(3)
        .max(30)
        .required(),

    genre: Joi.string()
        .min(3)
        .max(30),

    page: Joi.number(),

    published: Joi.number()

});

// exports
module.exports = {
    bookSchema
};