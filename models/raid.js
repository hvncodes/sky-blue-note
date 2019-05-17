const mongoose = require('mongoose');
const credentials = require('../config/config.js');

// remote db connection settings. For security, connectionString should be in a separate file not committed to git
// const connectionString = "mongodb+srv://<dbuser>:<dbpassword>@<cluster>.mongodb.net/test?retryWrites=true";

// local db connection settings 
// const ip = process.env.ip || '127.0.0.1';
// const connectionString = 'mongodb://' +ip+ '/<DB_NAME>';

mongoose.connect(credentials.db.connectionString, { dbName: credentials.db.name, useNewUrlParser: true }); //

// Get the default connection
let db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.on('open', () => {
    console.log('Mongoose connected.');
});

// define Raid model in JSON key/value pairs
// values indicate the data type of each key
const mySchema = mongoose.Schema({
    name: { type: String, required: true },
    element: String,
    quest: String,
    boss: String,
    difficulty: String,
    cost: Number,
    level: Number,
    type: String,
    attempts: String,
    url: String
}); 

module.exports = mongoose.model('Raid', mySchema);