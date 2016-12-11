var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ref')
var Schema = mongoose.Schema;

var PersonSchema = new Schema({
    name: String,
    age: Number,
    stories: [{
        type: Schema.ObjectId,
        ref: 'Story'
    }]
})

var StorySchema = new Schema({
    _creator: {
        type: Schema.ObjectId,
        ref: 'Person'
    },
    title: String,
    fans: [{
        type: Schema.ObjectId,
        ref: 'Person'
    }]
})


var Story = mongoose.model('Story', StorySchema);
var Person = mongoose.model('Person', PersonSchema);

/*var aAron = new Person({
    name: 'aAron',
    age: 12
})

aAron.save(function(err) {
    if (err) console.log(err);
    var story1 = new Story({
        title: 'a man cooked',
        _creator: aAron._id
    })
    aAron.stories.push(story1);
    aAron.save();
    story1.save(function(err) {
        if (err) console.log(err);
    })
})*/


/*Story
    .findOne({ title: /man/i })
    .populate('_creator', 'name') // <--
    .exec(function(err, story) {
        console.log(story)
            // console.log('The creator is %s', story._creator.name);
            // prints "The creator is Aaron"
    })
*/


Person
    .findOne({ name: 'aAron' })
    .populate('stories')
    .exec(function(err, person) {
        console.log(person)
    })
