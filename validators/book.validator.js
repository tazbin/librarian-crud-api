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
        .required()

});

// exports
module.exports = {
    bookSchema
};