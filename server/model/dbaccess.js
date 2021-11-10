const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/SpotReact');

const db = mongoose.connection;

db.on('error', () => console.log('error'));
db.once('open', () => console.log('connected to DB'))

module.exports = db;