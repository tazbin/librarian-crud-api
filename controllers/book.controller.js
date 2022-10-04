// imports
const express = require('express');
const createErrors = require('http-errors');
const bookService = require('../services/book.service');
const { Book } = require('../models/book.model');
const { isValidObjectId, trimAllObjValue } = require('../utils');
const { create } = require('domain');

const createBook = async(req, res, next) => {
    try {
        
        trimAllObjValue(req.body);
        let bookBody = req.body;
        console.log(bookBody);

        const savedBook = await bookService.createBook(bookBody)
        res.status(201).send(`New book created with title '${savedBook.title}' & author '${savedBook.author}`);

    } catch (error) {
        next(error);
    }
}

const getBooks = async(req, res, next) => {
    try {

        const title = req.query.title;
        const author = req.query.author;

        let searchParams = {};

        if( title ) {
            searchParams.title = { $regex: title, $options: "i" };
        }

        if( author ) {
            searchParams.author = { $regex: author, $options: "i" };
        }

        let selectFields = 'title author _id';

        let books = await bookService.readBooks(searchParams, selectFields);

        res.send(books);

    } catch (error) {
        next(error);
    }
}

const editBook = async(req, res, next) => {
    try {
        
        trimAllObjValue(req.body);
        const bookBody = req.body;

        // search with bookid
        const searchParams = {_id: bookBody.bookId };
        const selectFields = ['title'];

        const bookExists = await bookService.readBooks(searchParams, selectFields);

        if( bookExists.length == 0 ) {
            throw createErrors.NotFound("Book not found with this id");
        }

        // update book
        const updatedBook = await bookService.updateBook(
            bookBody.bookId, {
            title: bookBody.title,
            author: bookBody.author
        });

        res.send(`Book updated with id ${bookBody.bookId}`);

    } catch (error) {
        next(error);
    }
}

const deleteBook = async(req, res, next) => {
    try {
        
        const bookId = req.params.bookId;

        if( !isValidObjectId(bookId) ) {
            throw createErrors.BadRequest("Invalid book id");
        }

        // search with bookid
        const searchParams = {_id: bookId };
        const selectFields = ['title'];

        const bookExists = await bookService.readBooks(searchParams, selectFields);

        if( bookExists.length == 0 ) {
            throw createErrors.NotFound("Book not found with this id");
        }

        // delete book
        deleteParams = { _id: bookId }
        const deleteStatus = await bookService.deleteBook(deleteParams);

        if( deleteStatus.deletedCount == 1 ) {
            res.send(`Book deleted with id ${bookId}`);
        } else {
            throw createErrors.InternalServerError(`Couldn't delete, try again`);
        }


    } catch (error) {
        next(error);
    }
}

 // exports
 module.exports = {
    createBook,
    getBooks,
    editBook,
    deleteBook
 }