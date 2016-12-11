var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cart');

var Schema = mongoose.Schema;

var PersonSchema = new Schema({
    name: String,
    cart_products: [{
        type: Schema.ObjectId,
        ref: 'Product'
    }]
})

var ProductSchema = new Schema({
    name: String,
    num: Number,
    price: Number,
    userId: {
        type: Schema.ObjectId,
        ref: 'Person'
    }
})

var Person = mongoose.model('Person', PersonSchema);
var Product = mongoose.model('Product', ProductSchema);

// var zhangsan = new Person({
//     name: 'zhangsan',
// })

// zhangsan.save();

// 关联用户表，添加商品
// Person.findOne({ name: 'zhangsan' }, function(err, user) {
//     if (err) console.log(err);

//     var personid = user.id;
//     var product1 = new Product({
//         name: '苹果',
//         num: 3,
//         price: 1,
//         userId: personid
//     })
//     product1.save();
//     user.cart_products.push(product1);
//     user.save();
// })

// 查找用户下面的商品；
/*Person
    .findOne({ name: 'zhangsan' })
    .populate('cart_products')
    .exec(function(err, doc) {
        console.log(doc)
    })*/

// 查找商品的用户

Product.find({ name: '苹果' })
    .populate('userId')
    .exec(function(err, doc) {
        console.log(doc)
    })
