// imports
const express = require('express');
const createErrors = require('http-errors');
const cors = require('cors');

require('dotenv').config();
require('./helpers/mongodb.helper');

// imporitng routes
const bookRoute = require('./routes/book.route');

// constants
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: '*'
  }));

// defining routes
app.get('/', (req, res) => {
    res.send('Hello from backend');
});

app.use('/api/v1/book', bookRoute);

// handle wildcard route
app.use(async(req, res, next) => {
    next(createErrors.NotFound('This route does not exists!'));
});

// handle errors
app.use((err, req, res, next) => {

    if( err.name == "ValidationError" ) {
        err.status = 400;
    }

    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message || 'Internal server error'
        }
    });
});

// start the server
app.listen(PORT, () => {
    console.log(`server running at port ${PORT}...`);
});