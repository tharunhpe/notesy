var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Notes', new Schema({
    name: String,
    heading: String,
    content: String,
    lastModifiedTime: String,
    lastModifiedUser: String
}));

