var mongoose = require('mongoose');
var MovieSchema = require('../Schemas/movies');
var Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;
