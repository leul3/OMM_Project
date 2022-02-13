var express = require('express');
const multer = require('multer');
const fs = require('fs')
var Image = require("../models/image.js");

var router = express.Router();

const upload = multer({dest: 'public/images'})

// ... mounts to /upload/
router.get('/', function(req, res, next) {
    console.log('get')
    console.log(req.body)
    res.send('here to upload')
});


router.post('/', upload.single('ownTemplate'), async function(req, res, next) {
    console.log('req.file', req.file);
    let fileTyp = req.file.mimetype.split('/')[1];
    let newFileName = req.file.filename + '.' + fileTyp;
    console.log(newFileName)
    fs.rename(`public/images/${req.file.filename}`, `public/images/${newFileName}`, function() {
        Image.insertMany({name: newFileName, link: `../public/images/${newFileName}`});
        res.status(200).json({
            success: 'Success'
        });
    });
});

router.post('/url', async function (req, res, next) {
    console.log('receiving a url upload')
    console.log(req.body)
})

module.exports = router;