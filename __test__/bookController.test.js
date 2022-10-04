const request = require('supertest');
const mongoose = require("mongoose");
const { Book } = require("../models/book.model");
const app = require('../app');

beforeEach((done) => {
    mongoose.connect(
        "mongodb://localhost:27017/librarian-test",
        { useNewUrlParser: true },
        () => done()
    )
})

afterEach((done) => {
    mongoose.connection.db.dropDatabase(() => {
        mongoose.connection.close(() => done())
    })
})

describe('book controller suits', function () {

    // testing basic routing
    test("GET / ---> 200 status", async () => {

        const response = await request(app)
            .get("/")
            .set('Accept', 'application/json')

        expect(response.status).toEqual(200);
        expect(response.body).toEqual(
            expect.objectContaining({
                msg: 'Hello from backend'
            })
        )
    })

    // testing creating new book
    test("POST /api/v1/book ---> 201 status", async () => {

        const bookData = {
            title: "Learn Javascript",
            author: "Tazbinur Bhai"
        };

        const response = await request(app)
            .post("/api/v1/book")
            .set("accept", "application/json")
            .type('json')
            .send(bookData)

        // Check the response
        expect(response.status).toEqual(201);
        expect(response.body._id).toBeTruthy()
        expect(response.body.title).toBe(bookData.title)
        expect(response.body.author).toBe(bookData.author)

        // Check the bookData in the database
        const book = await Book.findOne({ _id: response.body._id })
        expect(book).toBeTruthy()
        expect(book.title).toBe(bookData.title)
        expect(book.author).toBe(bookData.author)
    })

    // testing getting list of all books
    test("GET /api/v1/book ---> 200 status", async () => {

        const newBook = await Book.create({
            title: "Learn Javascript",
            author: "Tazbinur Bhai"
        })

        const response = await request(app)
            .get("/api/v1/book")
            .set('Accept', 'application/json')

        expect(response.status).toEqual(200);
        expect(Array.isArray(response.body)).toBeTruthy()
        expect(response.body.length).toEqual(1)

        // Check the response data
        expect(response.body[0]._id).toBe(newBook.id)
        expect(response.body[0].title).toBe(newBook.title)
        expect(response.body[0].author).toBe(newBook.author)
    })

    // testing searching of book with title or author
    test("GET /api/v1/book?title=&author= ---> 200 status", async () => {

        const newBooks = await Book.create({
            title: "Learn Javascript",
            author: "Tazbinur Bhai"
        }, {
            title: "Mastering node js",
            author: "Imtiaz Ahmmed"
        });

        const response = await request(app)
            .get("/api/v1/book?author=Tazbinur")
            .set('Accept', 'application/json')

        expect(response.status).toEqual(200);
        expect(Array.isArray(response.body)).toBeTruthy()
        expect(response.body.length).toEqual(1)

        // Check the response data
        expect(response.body[0]._id).toBe(newBooks[0].id)
        expect(response.body[0].title).toBe(newBooks[0].title)
        expect(response.body[0].author).toBe(newBooks[0].author)
    })

    // testing updating a specific book
    test("POST /api/v1/book/ ---> 200 status", async () => {

        const book = await Book.create({
            title: "Learn Javascript",
            author: "Tazbinur Bhai"
        })

        const newBook = {
            bookId: book._id,
            title: "Learn Node js",
            author: "Imtiaz Ahmmed"
        };

        const response = await request(app)
            .put("/api/v1/book")
            .set("accept", "application/json")
            .type('json')
            .send(newBook)

        // Check the response
        expect(response.status).toEqual(200);
        expect(response.body._id).toBe(book.id)
        expect(response.body.title).toBe(newBook.title)
        expect(response.body.content).toBe(newBook.content)

        // Check the bookData in the database
        const updatedBook = await Book.findOne({ _id: response.body._id })
        expect(updatedBook).toBeTruthy()
        expect(updatedBook.title).toBe(newBook.title)
        expect(updatedBook.author).toBe(newBook.author)
    })

    // testing updating a specific book
    test("DELETE /api/v1/book/:bookId ---> 200 status", async () => {

        const book = await Book.create({
            title: "Dell monitor mannual book",
            author: "Dell authority"
        })

        const response = await request(app)
            .delete("/api/v1/book/" + book._id)
            .set("accept", "application/json")
            .type('json')

        // Check the response
        expect(response.status).toEqual(200);
        expect(response.body).toEqual(
            expect.objectContaining({
                msg: `Book deleted with id ${book._id}`
            })
        );

        // Check the bookData in the database
        const deletedBook = await Book.findOne({ _id: book._id })
        expect(deletedBook).toBeFalsy()
    })

});