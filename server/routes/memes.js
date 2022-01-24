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

    // example of URL:
    // http://localhost:5555/memes/doge?text=Such+beautiful+code&font=bold+100px+Menlo&color=white&x=0&y=0&text2=Wow&font2=bold+100px+Menlo&color2=black&x2=0&y2=0

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
                const font = urlParams.get('font');
                const color = urlParams.get('color');
                const x = urlParams.get('x');
                const y = urlParams.get('y');
                const text2 = urlParams.get('text2');
                const font2 = urlParams.get('font2');
                const color2 = urlParams.get('color2');
                const x2 = urlParams.get('x2');
                const y2 = urlParams.get('y2');
                const text3 = urlParams.get('text3');
                const font3 = urlParams.get('font3');
                const color3 = urlParams.get('color3');
                const x3 = urlParams.get('x3');
                const y3 = urlParams.get('y3');
                const text4 = urlParams.get('text4');
                const font4 = urlParams.get('font4');
                const color4 = urlParams.get('color4');
                const x4 = urlParams.get('x4');
                const y4 = urlParams.get('y4');
                const text5 = urlParams.get('text5');
                const font5 = urlParams.get('font5');
                const color5 = urlParams.get('color5');
                const x5 = urlParams.get('x5');
                const y5 = urlParams.get('y5');

                canvas.loadImage(path.join(__dirname, image.link)).then(image => {
                    // creation of the file 'meme.jpeg'
                    const canva = canvas.createCanvas(image.width, image.height);
                    const context = canva.getContext('2d');

                    // put the image one the background
                    context.drawImage(image, 0, 0, image.width, image.height);

                    // top text
                    context.font = font;
                    context.textAlign = 'center';
                    context.fillStyle = color;
                    context.fillText(text, image.width/2+parseInt(x), 100+parseInt(y));
                
                    // bottom text
                    context.font = font2;
                    context.textAlign = 'center';
                    context.fillStyle = color2;
                    context.fillText(text2, image.width/2+parseInt(x2), image.height-50+parseInt(y2));

                    // text 3
                    context.font = font3;
                    context.textAlign = 'center';
                    context.fillStyle = color3;
                    context.fillText(text3, image.width/2+parseInt(x3), 100+parseInt(y3));

                    // text 4
                    context.font = font4;
                    context.textAlign = 'center';
                    context.fillStyle = color4;
                    context.fillText(text4, image.width/2+parseInt(x4), 100+parseInt(y4));

                    // text 5
                    context.font = font5;
                    context.textAlign = 'center';
                    context.fillStyle = color5;
                    context.fillText(text5, image.width/2+parseInt(x5), 100+parseInt(y5));

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