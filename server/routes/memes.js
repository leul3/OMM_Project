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

// save a meme
router.post('/', async function(req, res, next) {
    let memeName = req.body.name;
    await fs.readFile('public/memes/memeUser1.jpeg', (err, data) => {
        if (err) throw err;
        fs.writeFile(`public/memes/${memeName}.jpeg`, data, async (err) => {
            if (err) throw err;
            await Meme.insertMany({name: memeName, link: `../public/memes/${memeName}.jpeg`, user: req.body.user});
            res.send(memeName);
        });
    });
    fs.unlink('public/memes/memeUser1.jpeg', (err) => {
        if (err) throw err;
    });
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
            if (result[0] != undefined) {
                let meme = result[0];
                res.sendFile(path.join(__dirname, meme.link));
            }
            // if the name doesn't exist, the server sends a random meme
            else {
                Meme.aggregate([{$sample:{size:1}}], (err, result) => {
                    if (err){
                        res.send(err);
                    }
                    else {
                        let meme = result[0];
                        res.sendFile(path.join(__dirname, meme.link));
                    }
                });
            }
        }
    });
});

  
// ... mounts to /memes/:memeName/delete
router.get('/:memeName/delete', function(req, res, next) {
    let memeName = req.params.memeName;
    Meme.remove({name: memeName}, (err) => {
        if (err) throw err;
        else {
            fs.unlink(`public/memes/${memeName}.jpeg`, (err) => {
                if (err) throw err;
            });
            res.send(memeName);
        };
    });
});

module.exports = router;