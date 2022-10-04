// imports
const Joi = require('joi');
const {
    bookSchema
 } = require('../validators/book.validator');

// middlewares
const validateBookReq = async (req, res, next) => {
    try {
        await bookSchema.validateAsync(req.body);
        next();

    } catch (error) {
        next(error);
    }
}

// exports
module.exports = {
    validateBookReq
}