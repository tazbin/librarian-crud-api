// imports
const express = require('express');
const createErrors = require('http-errors');
const { Book } = require('../models/book.model');

// CRUD
 const createBook = async(bookBody) => {
    try {

        const newBook = new Book(bookBody);
        let savedBook = await newBook.save();

        return Promise.resolve(savedBook);

    } catch (error) {
        return Promise.reject(error);
    }
}


const readBooks = async(
    searchParams,
    selectFields) => {
    try {

        const books = await Book
        .find(searchParams)
        .select(selectFields);

        return Promise.resolve(books);

    } catch (error) {
        return Promise.reject(error);
    }
}

const updateBook = async(
    bookId,
    fields) => {
    try {

        const books = await Book
        .findByIdAndUpdate(bookId, fields, {new: true});

        return Promise.resolve(books);

    } catch (error) {
        return Promise.reject(error);
    }
}

const deleteBook = async(deleteParams) => {
    try {

        const book = await Book.deleteOne(deleteParams);

        return Promise.resolve(book);

    } catch (error) {
        return Promise.reject(error);
    }
}


// exports
module.exports = {
    createBook,
    readBooks,
    updateBook,
    deleteBook
}