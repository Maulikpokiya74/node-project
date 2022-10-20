const express = require('express');

const cookieParser = require('cookie-parser');

const port = 8009;

const app = express();

const path = require("path");

const expressLayouts = require('express-ejs-layouts');

const db = require('./config/mongoose');

const session = require('express-session');

const passport = require('passport');

const LocalStrategy = require('./config/passport-local-strategy');

const flash = require("connect-flash");

const middlewareFlash = require('./config/middlewareFlash');

app.set('view engine','ejs');

app.set('views',path.join(__dirname,'views'));

app.set("layout login", false);
app.set("layout LostPassword", false);

app.use(express.static('assets'));

app.use('/uploads', express.static(__dirname+'/uploads'));

app.use(expressLayouts);

app.use(cookieParser());

app.use(express.urlencoded());

app.use(session({
    name : "Rnw",
    secret : "something",
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge : (1000 * 60 * 100)
    }
}))

app.use(passport.session());
app.use(passport.initialize());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(middlewareFlash.setFlash);

app.use('/',require('./routes'));



app.get('/', function(req,res){
    return res.render('index');
});

app.listen(port, function(err){
    if(err){
        console.log("server is not working");
        return false;
    }
    console.log("Server is running on port:",port);
});