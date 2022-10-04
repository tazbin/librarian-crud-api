// imports
const mongoose = require('mongoose');
const { Schema } = mongoose;

// shcema definition
const bookSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String
    },
    page: {
        type: Number
    },
    published: {
        type: Number
    }
  });

  const Book = mongoose.model('Book', bookSchema);
  
  // exports
  module.exports = {
      Book
    };