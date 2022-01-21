var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var canvas = require('canvas');
var Image = require("../models/image.js");

// ... mounts to /images/
router.get('/', function(req, res, next) {
    Image.find({}, (err, list) => {
        if (err)
            res.send(err);
        else {
            res.send(list);
        }
    })
});
  
// ... mounts to /images/:imageName
router.get('/:imageName', function(req, res, next) {
    // get the value of the here so called :imageId placeholder
    let imageName = req.params.imageName;
    // get the image metadata from the data storage
    Image.find({ 'name': imageName }, (err, result) => {
        if (err)
            res.send(err);
        else {
            let image = result[0];

            var url = new URL('http://localhost:5555/memes/' + req.url);
            const urlParams = new URLSearchParams(url.search);

            if (urlParams.has('text')) {
                const text = urlParams.get('text');
                const x = urlParams.get('x');
                const y = urlParams.get('y');
                const text2 = urlParams.get('text2');
                const x2 = urlParams.get('x2');
                const y2 = urlParams.get('y2');

                // creation of the file 'meme.jpeg'
                const width = 1360;
                const height = 1020;
                const canva = canvas.createCanvas(width, height);
                const context = canva.getContext('2d');

                canvas.loadImage(path.join(__dirname, image.link)).then(image => {
                    // put the image one the background
                    context.drawImage(image, 0, 0, width, height);

                    // top text
                    context.font = 'bold 60pt Menlo';
                    context.textAlign = 'center';
                    context.fillStyle = '#fff';
                    context.fillText(text, width/2+parseInt(x), 100+parseInt(y));
                
                    // bottom text
                    context.font = 'bold 60pt Menlo';
                    context.textAlign = 'center';
                    context.fillStyle = '#fff';
                    context.fillText(text2, width/2+parseInt(x2), height-100+parseInt(y2));

                    // save the file 'meme.jpeg'
                    const buffer = canva.toBuffer('image/png');
                    fs.writeFileSync(path.join(__dirname, '../public/images/meme.jpeg'), buffer);

                    // send the image
                    res.sendFile(path.join(__dirname, '../public/images/meme.jpeg'));
                });
            }
            else {
                res.sendFile(path.join(__dirname, image.link));
            }
        }
    });
});

module.exports = router;