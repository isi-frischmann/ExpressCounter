// require express
var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "./static")));

app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000}
}))

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// tell the express app to listen on port 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
   });

// root route to render the index.ejs view
app.get('/', function(req, res) {
    if (req.session.count == null){
        req.session.count = 1;
    }
    var count = req.session.count;
    req.session.count += 1;
    res.render("index", {counting : count});
})

// add two to session
app.post('/addTwo', function (req, res){
    req.session.count += 1; //just add one because it will redirect to the index file and it will add one anyway! If I add two it would add 3 at the end
    res.redirect('/');
})

// set the session back to 0
app.post('/delete', function (req, res){
    req.session.count = 1;
    res.redirect('/');
})
