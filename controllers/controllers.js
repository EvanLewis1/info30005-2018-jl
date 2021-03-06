var mongoose = require('mongoose');

var Items = mongoose.model('lists');
var Bins = mongoose.model('bins');
var Posts = mongoose.model("posts");



var creatitem = function (req, res) {
    //console.log(req.body);
    var item = new Items({
        "name": req.body.name,
        "address": req.body.address,
        "firstname": req.body.firstname,
        "lastname": req.body.lastname,
        "phone": req.body.phone,
        "email": req.body.email,
        "passwordHash": req.body.passwordHash,
    });
    item.save(function (err, newItems) {
        if (!err) {
            res.send(newItems);
        } else {
            res.sendStatus(400);
        }
    });
};

var addBin = function (req, res) {

    console.log("received location: ", req.body.location)
    var bin = new Bins({
        "location": req.body.location,
    });

    bin.save(function (err, newItems) {
        if (!err) {
            res.send("ok");
        } else {
            console.log("error", err)
            res.sendStatus(400);
        }
    })
};

var loadBins = function (req, res) {
    Bins.find({}, function (err, bins) {
        if (!err) {
            res.send(bins);
        } else {
            res.sendStatus(400);
        }
    })
};



var findAllItems = function (req, res) {
    Items.find({}, function (err, lists) {
        if (!err) {
            //console.log(lists);
            res.send(lists);
        } else {
            res.sendStatus(400);
        }
    });
};

var findOneItem = function (req, res) {
    var itemIndex = req.params.id;
    Items.findById(itemIndex, function (err, item) {
        if (!err) {
            res.send(item);
        } else {
            res.sendStatus(404);
        }
    });
};

var findByName = function (req, res) {
    var itemName = req.params.name;
    Items.findOne({name: itemName}, function (err, item) {
        if (!err) {
            res.send(item);
        } else {
            res.sendStatus(404);
        }
    });
};

var findByEmail = function (req, res) {
    var itemEmail = req.params.email;
    Items.findOne({email: itemEmail}, function (err, item) {
        if (!err) {
            res.send(item);
        } else {
            res.sendStatus(404);
        }
    });
};

var updateItems = function(req,res){
    Items.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, item) {
        if (!err) {
            res.send(item)
        }else{
            res.sendStatus(404)
        }
    });
};

/*add posts of devices to the post database*/
var addPost = function(req,res){
    var post = new Posts({
        "owner": req.body.owner,
        "brand": req.body.brand,
        "category":req.body.category,
        "name": req.body.name,
        "age": req.body.age,
        "description": req.body.description,
        "imageurl": req.body.imageurl
    });
    post.save(function (err, newItems) {
        if (!err) {
            res.send(newItems);
        } else {
            res.sendStatus(400);
        }
    });
};

//get the posts by email
var findPostsEmail = function (req, res) {
    var postEmail = req.params.email;
    Posts.find({owner: postEmail}, function (err, posts) {
        if (!err) {
            res.send(posts);
        } else {
            res.sendStatus(404);
        }
    });
};

var loadAllPosts = function(req, res){

    Posts.find({}, function (err, posts) {
        if (!err) {
            res.send(posts);
        } else {
            res.sendStatus(400);
        }
    })
};

var deleteOneDevice = function(req,res){
    var postID = req.params.id;
    Posts.remove({_id:postID}, function (err, posts) {
        if (!err) {
            res.send(posts);
        } else {
            res.sendStatus(404);
        }
    });
};

module.exports.deleteOneDevice = deleteOneDevice;
module.exports.findPostsEmail = findPostsEmail;
module.exports.updataItems = updateItems;
module.exports.creatitem = creatitem;
module.exports.findAllItem = findAllItems;
module.exports.findOneItem = findOneItem;
module.exports.findByName = findByName;
module.exports.findByEmail = findByEmail;
module.exports.addBin = addBin;
module.exports.loadBins = loadBins;
module.exports.addPost = addPost;
module.exports.loadAllPosts = loadAllPosts;

