const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
const app = express(); //instance of express
const sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database('database/squirrel.db'); //database

app.use(bodyParser.json()); // to support JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public')); //to use css files, and other htmls
app.set('views', path.join(__dirname, 'views')); //to use pug
app.set('view engine', 'pug');

//this is the main page, when you just input localhost:3000
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});
//for debugging to check if form values are going through
app.post('/test', (req, res) => {
    const location = req.body.location;
    const age = req.body.age;
    const pricolor = req.body.pricolor;
    const eating = req.body.eating;

    res.send(location + "//" + age + "//" + pricolor + "//" + eating)
})
/*------------------------------------------API-----------------------------------------------*/
app.post('/squirrel', (req, res) => {
    //change in endpoint 
    const LOCATION = req.body.location;
    const AGE = req.body.age;
    const pCOLORID = req.body.pricolor;
    const sCOLORID = req.body.seccolor
    const EATING = req.body.eating;
    const COLORID = getColor(pCOLORID, sCOLORID); //function to get the correct color id based on form values

    //ORIGINAL-> var { LOCATION, AGE, COLORID, EATING } = req.body;
    var insert = `INSERT INTO Squirrel (LOCATION, AGE, COLORID, EATING) VALUES (?,?,?,?)`; // (?,?,?,?) SQLite format
    db.run(insert, [LOCATION, AGE, COLORID, EATING]);

    res.sendFile(__dirname + "/public/submit.html"); //takes user to submit page
});
//original 
app.get('/squirrel', (req, res) => {
    var results = [];
    db.serialize(function () {
        db.each('SELECT * FROM Squirrel', function (err, row) {
            results.push({ id: row.ID, location: row.LOCATION, age: row.AGE, colorid: row.COLORID, eating: row.EATING });
        }, function () {
            res.send({ 'squirrel_info': results });
        });
    });
});
//changed from above get request
app.get('/rephistory', (req, res) => {
    var results = [];
    db.serialize(function () {
        db.each('SELECT * FROM Squirrel', function (err, row) {
            //pushes each row in the table in a json array
            results.push({ id: row.ID, location: row.LOCATION, age: row.AGE, colorid: row.COLORID, eating: row.EATING });
        }, function () {
            if (results.length < 1) { //checks if there is history
                res.send("No reports have been made yet, go make on!");
            } else { //instead of send, use render to send the result arry to the history.pug file
                res.render('history', {
                    report: results
                });
            }
        });
    });
});
//server
app.listen(3000, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("working!");
    }
})
//function will return the color id number based on primary and secondary colors chosen in form
function getColor(pCOLORID, sCOLORID) {
    if (pCOLORID == "Gray") {
        if (sCOLORID == "Gray") {
            return 7
        } else if (sCOLORID == "Cinnamon") {
            return 1
        } else if (sCOLORID == "Black") {
            return 4
        }
    } else if (pCOLORID == "Cinnamon") {
        if (sCOLORID == "Gray") {
            return 5
        } else if (sCOLORID == "Cinnamon") {
            return 8
        } else if (sCOLORID == "Black") {
            return 2
        }
    } else if (pCOLORID == "Black") {
        if (sCOLORID == "Gray") {
            return 3
        } else if (sCOLORID == "Cinnamon") {
            return 6
        } else if (sCOLORID == "Black") {
            return 9
        }
    }
}