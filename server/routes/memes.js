var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var Image = require("../models/image.js");
var Meme = require("../models/meme.js");

// ... mounts to /images/
router.get('/', function(req, res, next) {
    Meme.find({}, (err, list) => {
        if (err)
            res.send(err);
        else {
            res.send(list);
        }
    })
});

  
// ... mounts to /images/:imageName
router.get('/:memeName', function(req, res, next) {
    // get the value of the here so called :memeName placeholder
    let memeName = req.params.memeName;
    // get the meme metadata from the data storage
    Meme.find({ 'name': memeName }, (err, result) => {
        if (err){
            res.send(err);
        }
        else {
            let meme = result[0];
            res.sendFile(path.join(__dirname, meme.link));
        }
    });
});

module.exports = router;