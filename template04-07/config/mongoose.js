const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/College');

const db = mongoose.connection;

db.on('err',console.error.bind(console,"db not connected"));

db.once('open', function(err){
    if(err){
        console.log("db is not opened");
        return false;
    }

    console.log("db is connected");
});

module.exports=db;