var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var canvas = require('canvas');
var Image = require("../models/image.js");

var canvasWidth = 800;
var canvasHeight= 1000;
var img1Width   = 0;
var img1Height  = 0;
var img1Ratio   = 0;
var img2Width   = 0;
var img2Height  = 0;
var img2Ratio   = 0;



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
    // http://localhost:5555/images/doge?text=Such+a+beautiful+code&bold=&size=50&font=Menlo&color=white&x=0&y=0&text2=Wow&bold2=true&size2=50&font2=Menlo&color2=black&x2=0&y2=0

    // get the value of the here so called :imageId placeholder
    let imageName = req.params.imageName;
    // get the image metadata from the data storage
    Image.find({ 'name': imageName }, (err, result) => {
        if (err){
            res.send(err);
            console.log("error in image not found");
        }
        else {
            let image = result[0];

            var url = new URL('http://localhost:5555/images/' + req.url);
            const urlParams = new URLSearchParams(url.search);

            if (urlParams.has('text')) {
                const text = urlParams.get('text');
                const bold = urlParams.get('bold');
                const size = urlParams.get('size');
                const font = urlParams.get('font');
                const color = urlParams.get('color');
                const x = urlParams.get('x');
                const y = urlParams.get('y');
                const text2 = urlParams.get('text2');
                const bold2 = urlParams.get('bold2');
                const size2 = urlParams.get('size2');
                const font2 = urlParams.get('font2');
                const color2 = urlParams.get('color2');
                const x2 = urlParams.get('x2');
                const y2 = urlParams.get('y2');
                const text3 = urlParams.get('text3');
                const bold3 = urlParams.get('bold3');
                const size3 = urlParams.get('size3');
                const font3 = urlParams.get('font3');
                const color3 = urlParams.get('color3');
                const x3 = urlParams.get('x3');
                const y3 = urlParams.get('y3');
                const text4 = urlParams.get('text4');
                const bold4 = urlParams.get('bold4');
                const size4 = urlParams.get('size4');
                const font4 = urlParams.get('font4');
                const color4 = urlParams.get('color4');
                const x4 = urlParams.get('x4');
                const y4 = urlParams.get('y4');
                const text5 = urlParams.get('text5');
                const bold5 = urlParams.get('bold5');
                const size5 = urlParams.get('size5');
                const font5 = urlParams.get('font5');
                const color5 = urlParams.get('color5');
                const x5 = urlParams.get('x5');
                const y5 = urlParams.get('y5');

                // const secImg = urlParams.get('secImg');

                const canva = canvas.createCanvas(canvasWidth, canvasHeight);
                canvas.loadImage(path.join(__dirname, image.link)).then(image => {
                    // creation of the file 'meme.jpeg'
                    
                    const context = canva.getContext('2d');
                    // context.fillStyle = 'red';
                    // context.fillRect(0,0,canvasWidth, canvasHeight);
                    img1Ratio = image.width / image.height;
                    img1Width = canvasWidth;
                    img1Height = img1Width /img1Ratio;

                    if(img1Height > canvasHeight){
                        img1Height = canvasHeight
                        img1Width = img1Height * img1Ratio
                    }

                    // put the image one the background
                    context.drawImage(image, 0, 0, img1Width, img1Height);
                    // if(secImg != "")
                    //     context.drawImage(secImg, 0, 0, 100, 100/img1Ratio )

                    // top text
                    context.font = size + "px " + font;
                    if (bold == "true") { context.font = "bold " + context.font}
                    context.textAlign = 'center';
                    context.fillStyle = color;
                    context.fillText(text, canvasWidth/2+parseInt(x), 100+parseInt(y));
                
                    // bottom text
                    context.font = size2 + "px " + font2;
                    if (bold2 == "true") { context.font = "bold " + context.font}
                    context.textAlign = 'center';
                    context.fillStyle = color2;
                    context.fillText(text2, canvasWidth/2+parseInt(x2), canvasHeight-50+parseInt(y2));

                    // text 3
                    context.font = size3 + "px " + font3;
                    if (bold3 == "true") { context.font = "bold " + context.font}
                    context.textAlign = 'center';
                    context.fillStyle = color3;
                    context.fillText(text3, canvasWidth/2+parseInt(x3), 100+parseInt(y3));

                    // text 4
                    context.font = size4 + "px " + font4;
                    if (bold4 == "true") { context.font = "bold " + context.font}
                    context.textAlign = 'center';
                    context.fillStyle = color4;
                    context.fillText(text4, canvasWidth/2+parseInt(x4), 100+parseInt(y4));

                    // text 5
                    context.font = size5 + "px " + font5;
                    if (bold5 == "true") { context.font = "bold " + context.font}
                    context.textAlign = 'center';
                    context.fillStyle = color5;
                    context.fillText(text5, canvasWidth/2+parseInt(x5), 100+parseInt(y5));

                    // save the file 'memeUser1.jpeg'
                    const buffer = canva.toBuffer('image/png');
                    fs.writeFileSync('public/memes/memeUser1.jpeg', buffer);

                    // send the image
                    res.sendFile(path.join(__dirname, '../public/memes/memeUser1.jpeg'));
                });
            }
            else {
                res.sendFile(path.join(__dirname, image.link));
            }
        }
    });
});

module.exports = router;