var mongoose = require('mongoose');
mongoose.connect('mongodb://user2:1234567@ds261929.mlab.com:61929/recyclingpoint',function(err){
    if(!err){
        console.log("Connect to mongo");
    }else{
        console.log("Fail to connect to mongo");
    }
});

require('./list.js');