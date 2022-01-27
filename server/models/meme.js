var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MemeSchema = new Schema({
    name: String,
    link: String,
    user: String
},
{ collection: "memes" });

module.exports = mongoose.model('meme', MemeSchema );