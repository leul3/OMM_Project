var express = require('express');

var router = express.Router();

// ... mounts to /upload/
router.get('/', function(req, res, next) {
    console.log('get')
    console.log(req.body)
    res.send('here to upload')
});

router.post('/', function(req, res, next) {
    console.log('post') ; 
    console.log(req.body.test);
    res.status(200).json({
        success: 'Success'
    })
});

module.exports = router;