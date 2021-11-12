const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TagSchema = new Schema({
  name: String
});

module.exports = mongoose.model('Tag', TagSchema)