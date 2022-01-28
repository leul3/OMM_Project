var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var Meme = require("../models/meme.js");

// ... mounts to /memes/
router.get('/', function(req, res, next) {
    Meme.find({}, (err, list) => {
        if (err)
            res.send(err);
        else {
            res.send(list);
        }
    })
});

  
// ... mounts to /memes/:memeName
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

  
// ... mounts to /memes/:memeName/save
router.get('/:memeName/save', function(req, res, next) {
    let memeName = req.params.memeName;
    fs.readFile(path.join(__dirname, '../public/memes/memeUser1.jpeg'), async (err, data) => {
        if (err) throw err;
        fs.writeFile(path.join(__dirname, `../public/memes/${memeName}.jpeg`), data, (err) => {
            if (err) throw err;
            Meme.insertMany({name: memeName, link: `../public/memes/${memeName}.jpeg`, user: 'User1'});

        });
    });
    fs.unlink(path.join(__dirname, '../public/memes/memeUser1.jpeg'), async (err) => {
        if (err) throw err;
    });
    res.send(memeName);
});

  
// ... mounts to /memes/:memeName/delete
router.get('/:memeName/delete', function(req, res, next) {
    let memeName = req.params.memeName;
    Meme.remove({name: memeName}, (err) => {
        if (err) throw err;
        else {
            fs.unlink(path.join(__dirname, `../public/memes/${memeName}.jpeg`), async (err) => {
                if (err) throw err;
            });
            res.send(memeName);
        };
    });
});

module.exports = router;