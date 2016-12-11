/**
 * Created by Administrator on 2016/12/10.
 */

var mongodb = require('./mongodb');
var Schema = mongodb.mongoose.Schema;

var MovieSchema = new Schema({
    name: String,
    alias: [String],
    publish: Data,
    create_date: {
        type: Date,
        default: Date.now
    },
    images:{
        coverSmall: String,
        coverBig: String
    },
    source:[{
        source: String,
        link: String,
        swfLink:String,
        version:String,
        lang: String,
        subtitle: String,
        create_date: {
            type: Date,
            default:Date.now
        }
    }]
})

var Movie = mongodb.mongoose.model('Movie',MovieSchema);

var Movie =