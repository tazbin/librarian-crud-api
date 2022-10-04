// imports
const express = require('express');
const createErrors = require('http-errors');
const bookCtrl = require('../controllers/book.controller');
const {
    validateBookReq,
    validateUpdateBookReq
} = require('../middlewares/book.middleware');

// constants
const router = express.Router();

// endpoints
router.post('/', validateBookReq, bookCtrl.createBook);
router.get('/', bookCtrl.getBooks);
router.put('/', validateUpdateBookReq, bookCtrl.editBook);
router.delete('/:bookId', bookCtrl.deleteBook);


// exports
module.exports = router;