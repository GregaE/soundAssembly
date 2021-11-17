const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL);
require('dotenv').config();

const db = mongoose.connection;

db.on('error', () => console.log('error'));
db.once('open', () => console.log('connected to DB'))

module.exports = db;