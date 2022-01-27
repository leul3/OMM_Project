var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var Meme = require("../models/meme.js");

// save meme on the server and delete the 'working file'
router.get('/:memeName', function(req, res, next) {
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

module.exports = router;