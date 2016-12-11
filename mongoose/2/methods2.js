var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/person')
var personSchema = new mongoose.Schema({
    name: String
})

//实例方法
personSchema.methods.speak = function(){
    console.log(this.name)
}

personSchema.methods.findByname = function(name,cb){
    this.model('Person').find({name:name},cb)
}


//模式 也就是类
var Person = mongoose.model('Person',personSchema);

//实例
var person = new Person(
    {
        name: 'haha'
    }
)

person.speak()
person.findByname('haha',function(err,doc){
    console.log('doc')
    console.log(doc)
})

//person.save(function(err,doc){
//    console.log(doc);
//})
//
//Person.find({name:'haha'},function(err,doc){
//    console.log('person');
//    console.log(doc)
//})

