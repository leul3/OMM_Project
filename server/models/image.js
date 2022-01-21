var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    name: String,
    link: String
},
{ collection: "images" });

module.exports = mongoose.model('image', ImageSchema );