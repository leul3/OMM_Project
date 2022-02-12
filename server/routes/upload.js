var express = require('express');
const multer = require('multer');
const fs = require('fs')

var router = express.Router();

const upload = multer({dest: 'public/images'})

// ... mounts to /upload/
router.get('/', function(req, res, next) {
    console.log('get')
    console.log(req.body)
    res.send('here to upload')
});


router.post('/', upload.single('ownTemplate'), async function(req, res, next) {
    // console.log('req.file', req.file);
    // let fileTyp = req.file.mimetype.split('/')[1];
    // let newFileName = req.file.filename + '.' + fileTyp;
    // console.log(newFileName)
    fs.rename(`public/images/${req.file.filename}`, `public/images/${req.file.originalname}`, function() {
        console.log('callback of upload');
        res.status(200).json({
            success: 'Success'
        });
    });
});

module.exports = router;