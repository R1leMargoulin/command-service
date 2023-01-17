const mongoose = require('mongoose')
mongoose.Promise = global.Promise;

const db = {}
db.mongoose = mongoose
db.commands = require('./commands.model');
module.exports = db