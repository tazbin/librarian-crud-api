// imports
const Joi = require('joi');
const {
    createBookSchema,
    updateBookSchema
 } = require('../validators/book.validator');

// middlewares
const validateBookReq = async (req, res, next) => {
    try {
        await createBookSchema.validateAsync(req.body);
        next();

    } catch (error) {
        next(error);
    }
}

const validateUpdateBookReq = async (req, res, next) => {
    try {
        await updateBookSchema.validateAsync(req.body);
        next();

    } catch (error) {
        next(error);
    }
}

// exports
module.exports = {
    validateBookReq,
    validateUpdateBookReq
}