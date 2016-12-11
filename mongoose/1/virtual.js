/**
 * Created by liuxsen on 2016/12/10.
 */
var mongoose = require('mongoose');

var PersonSchema =  new mongoose.Schema({
    firstName : String,
    lastName : String
})
//设置转化为json的时候带上虚拟属性
PersonSchema.set('toJSON',{getters:true,virtual:true})
// Schema.virtual
//虚拟属性
PersonSchema.virtual('fullName').get(function(){
    return this.firstName + this.lastName;
})

var Person = mongoose.model('person',PersonSchema);

var person = new Person({
    firstName: '张',
    lastName: '小明'
})

console.log(person.fullName)

console.log('json',JSON.stringify(person))