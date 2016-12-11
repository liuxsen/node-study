/**
 * Created by liuxsen on 2016/12/10.
 */

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/part10');

var BookSchema = new mongoose.Schema({
    name : String,
    isbn: Number
})

//类方法
BookSchema.statics.findByBN = function(isbn,cb){
    this.findOne({isbn:isbn},function(err,doc){
        cb(err,doc)
    })
}

//实例方法
BookSchema.methods.print = function(){
    console.log('Book information');
    console.log('\tTitile',this.name);
    console.log('\tISBN',this.isbn);
}


var Book = mongoose.model('Book',BookSchema);


var book = new Book({
    name: 'haha',
    isbn: 9876
})

book.save(function(err){
    if(err){
        console.log('save faild',err);
    }
    Book.findByBN(9876,function(err,doc){
        console.log(doc);
    })
    book.print();
})