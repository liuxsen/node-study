var _ = require('underscore');

var foo = {
    foo: 'foo',
    bar: 'bar'
}

var bar = {
    foo: 'bar',
    bar: 'foo'
}

var _obj = _.extend(foo, bar);
console.log(_obj)
