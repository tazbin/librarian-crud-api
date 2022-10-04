// imports
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

// defining book validation schemas
const createBookSchema = Joi.object({

    title: Joi.string()
        .min(3)
        .max(30)
        .required(),

    author: Joi.string()
        .min(3)
        .max(30)
        .required()

});

const updateBookSchema = Joi.object({
    bookId: Joi.objectId()
        .required(),

    title: Joi.string()
        .min(3)
        .max(30)
        .trim()
        .required(),

    author: Joi.string()
        .min(3)
        .max(30)
        .trim()
        .required()

});

// exports
module.exports = {
    createBookSchema,
    updateBookSchema
};