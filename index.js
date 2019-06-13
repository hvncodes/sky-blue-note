'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser'); 
//const session = require('express-session');
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true})); // parse form submissions
app.use(cookieParser()); 
// app.use(session({
//     secret: 'secretKey',
//     resave: false,
//     saveUninitialized: true
// }));

let handlebars =  require('express-handlebars');
app.engine('.html', handlebars({extname: '.html'}));
app.set('view engine', '.html');

let Raid = require('./models/raid.js');
let allRaids =[];
let selectedRaids = [];
let freeRaids = [];
let finishedTasks = [];

// renders home page with inventory
app.get('/', (req, res) => {
    res.type('text/html');
    Raid.find({}, (err, items, next) => {
        if (err) return next(err);
        res.cookie("allRaids", items);
        res.render('../public/home', {
            items: items,
            showBottomNav: false
        });
    });
        
});

//Route for adding cookie
app.get('/setcookie', (req, res) => {
    let items = [
        {
            name:"Lvl 30 Colossus",
            element:"fire",
            quest:"lvl30colossus",
            boss:"Colossus",
            difficulty:"Normal",
            cost:"10",
            level:"30",
            type:"daily",
            attempts:"3",
            url:""
        },
        {
            name:"Lvl 30 Adversa",
            element:"light",
            quest:"lvl30adversa",
            boss:"Adversa",
            difficulty:"Normal",
            cost:"10",
            level:"30",
            type:"daily",
            attempts:"3",
            url:""
        },
        {
            name:"Lvl 30 Celeste",
            element:"dark",
            quest:"lvl30celeste",
            boss:"Celeste",
            difficulty:"Normal",
            cost:"10",
            level:"30",
            type:"daily",
            attempts:"3",
            url:""
        },
        {
            name:"Lvl 30 Leviathan",
            element:"water",
            quest:"lvl30leviathan",
            boss:"Leviathan",
            difficulty:"Normal",
            cost:"10",
            level:"30",
            type:"daily",
            attempts:"3",
            url:""
        },
        {
            name:"Lvl 30 Tiamat",
            element:"wind",
            quest:"lvl30tiamat",
            boss:"Tiamat",
            difficulty:"Normal",
            cost:"10",
            level:"30",
            type:"daily",
            attempts:"3",
            url:""
        }
    ];
    res.cookie("selectedRaids", items);
    res.send('sample user data added to cookie');
});

//Iterate selectedRaids data from cookie
app.get('/getcookie', (req, res) => {
    //array of selectedRaids
    //console.log(req.cookies.selectedRaids);
    
    //shows all the cookies
    console.log(req.cookies);
    console.log("====================");
    //console.log(req.session);
    
    //show first selectedRaid in array
    //res.send(req.cookies.selectedRaids[0]);
    
    //show selectedRaid as JSON
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(req.cookies.selectedRaids, null, 2));
});

app.get('/addtocookie', (req, res) => {
    selectedRaids.push({
        name:"Lvl 99 Colossus",
        element:"fire",
        quest:"lvl30colossus",
        boss:"Colossus",
        difficulty:"Normal",
        cost:"10",
        level:"30",
        type:"daily",
        attempts:"3",
        url:""
    });
    console.log(selectedRaids); //add to global, checked and works
    res.cookie("selectedRaids", selectedRaids); //add to cookie, checked and works
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(req.cookies.selectedRaids, null, 2));
});

//route for finished tasks
app.get('/finished', (req, res) => {
    res.send(req.cookies.finishedTasks);
});

// view
app.get('/view', (req, res) => {
    let showPrompt = true;
    //let freeRaids = req.cookies.freeRaids;
    let selectedRaids = req.cookies.selectedRaids;
    if (selectedRaids) { //freeRaids exist
        showPrompt = false;
    }
    res.render('view', {
        raids: selectedRaids,
        showBottomNav: true,
        showPrompt: showPrompt
    });
});

// app.get selection page w/ checkboxes
app.get('/select', (req, res) => {
    let collection = req.cookies.allRaids;
    let selection = req.cookies.selectedRaids;
    let available = req.cookies.freeRaids;
    
    //if not set, create cookie and show
    if (collection == undefined) {
        
        Raid.find({}, (err, items, next) => {
            if (err) return next(err);
            res.cookie("allRaids", items);
            res.render('select', {
                raids: items,
                showBottomNav: true,
                json: JSON.stringify(items, null, 2)
            });
        });
        
    //is set, show
    } else if (collection) { 
        
        //no selection, show everything
        if (selection == undefined) {
            
            res.render('select', {
                raids: collection,
                showBottomNav: true,
                json: JSON.stringify(collection, null, 2)
            });
            
        //selection, show unpicked
        } else if (selection) {
            
            //available/unpicked cookie doesn't exist, create and show
            if (available == undefined) {
                available = [];
                for (let colIndex in collection) {
                    let isAvailable = true;
                    let quest = collection[colIndex].quest;
                    for (let selIndex in selection) {
                        if (quest == selection[selIndex].quest) {
                            isAvailable = false;
                        }
                    }
                    if (isAvailable) {
                        available.push(collection[colIndex]);
                    }
                }
                res.cookie("freeRaids", available);
                res.render('select', {
                    raids: available,
                    showBottomNav: true,
                    json: JSON.stringify(available, null, 2)
                });
                
            //available/unpicked cookie exists, show
            } else if (available) {
                res.render('select', {
                    raids: available,
                    showBottomNav: true,
                    json: JSON.stringify(available, null, 2)
                });
            }
        }
    }
});

// POST method via form submission, form action leads to same page? maybe
// app.post selection take POST and puts them into cookie
app.post('/select', (req, res) => {
    let collection = req.cookies.allRaids; // every entry
    let selection = req.cookies.selectedRaids; //not avaiable to pick, shows up in view
    let available = req.cookies.freeRaids; //avaiable to pick, shows up in select
    
});

// route for resetting cookie
app.get('/reset', (req, res) => {
    res.type('text/html');
    res.clearCookie('allRaids');
    res.clearCookie('selectedRaids');
    res.clearCookie('freeRaids');
    res.clearCookie('finishedRaids');
    res.render('reset');
}); 

// define 404 handler
app.use( (req, res) => {
    res.type('text/plain'); 
    res.status(404);
    res.send('404 - Not found');
});

// start server listening for connections
app.listen(process.env.PORT, process.env.IP, () => {
    console.log('Express started'); 
});