/**
 * Created by liuxsen on 2016/12/10.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_database')
var BookSchema = new mongoose.Schema({
    isbn:{
        type: Number,
        unique: true
    },
    name: {
        type: String,
        index: true
    }
})

var Book = mongoose.model('Book',BookSchema);

var book = new Book({
    name: 'haha'
})

console.log(book)