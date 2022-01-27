var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var Meme = require("../models/meme.js");

// save meme on the server and delete the 'working file'
router.get('/:memeName', function(req, res, next) {
    let memeName = req.params.memeName;
    Meme.deleteOne({name: memeName});
    fs.unlink(path.join(__dirname, `../public/memes/${memeName}.jpeg`), async (err) => {
        if (err) throw err;
    });
    res.send(memeName);
});

module.exports = router;