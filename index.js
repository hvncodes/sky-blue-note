'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true})); // parse form submissions

let handlebars =  require('express-handlebars');
app.engine('.html', handlebars({extname: '.html'}));
app.set('view engine', '.html');

let Raid = require('./models/raid.js');

// send static file as response
// app.get('/', (req, res) => {
//  res.type('text/html');
//  res.sendFile(__dirname + '/public/home.html'); 
// });

// renders home page with inventory
app.get('/', (req, res) => {
    res.type('text/html');
    
    // uncomment to update/insert back a single record
    // testing: 'dune' in delete case
    /*
    var newBook = {'title':'dune', 'author':'frank herbert', 'pubdate': 1963 }
    Raid.updateOne({'title':'dune'}, newBook, {upsert:true}, (err, result) => {
      if (err) return next(err);
      // console.log(result);
    });
    */
    
    // return all records
    Raid.find({}, (err, items) => {
        if (err) return next(err);
        //console.log(items);
        console.log(__dirname + '/public');
        res.render('../public/home', {items: items});
    });
});

// define 404 handler
app.use( (req,res) => {
    res.type('text/plain'); 
    res.status(404);
    res.send('404 - Not found');
});

// start server listening for connections
app.listen(process.env.PORT, process.env.IP, () => {
    console.log('Express started'); 
});