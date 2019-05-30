var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 8080;
var path = require('path');
var watermark = require('image-watermark');
var Jimp = require('jimp');
var sizeOf = require('image-size');



// var option = { 'text': 'sample watermark' };
// app.get('/watermark', function (req, res) {
//   // res.send('done');
//   // return
//   // watermark.embedWatermarkWithCb('./public/src/image1.jpg', option)
//   watermark.embedWatermarkWithCb('./public/src/image1.jpg', { 'text': 'sample watermark' }, function (err) {
//     if (!err)
//       console.log('Succefully embeded watermark');
//     else {
//       console.log(err);
//     }
//   });
// })





let imgRaw = './public/src/chitwan.jpg';
let imgLogo = './public/img/logo.png';
let imgExported = './public/src/image1.jpg';


app.get('/watermark', function (req, res) {
  sizeOf(imgRaw, function (err, dimensions) {
    console.log(dimensions.width, dimensions.height);
    Jimp.read(imgRaw)
      .then(tpl =>
        Jimp.read(imgLogo).then(logoTpl => {
          logoTpl.opacity(0.4);
          console.log(dimensions.width, dimensions.height);
          const height=dimensions.height;
          const width=dimensions.width;
          console.log(height/2,width/2);
          console.log(tpl.getHeight(),tpl.getWidth());
          return tpl.composite(logoTpl,
            width/2,
            height/2,
            // (dimensions.height) / 2, //Height from Top
            // (dimensions.width) / 2, //Width from left corner
            Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE);
        }))
      .then(tpl => (tpl.quality(100).write(imgExported)))
      .then(tpl => {
        console.log('exported file: ' + imgExported);
      })
      .catch(err => {
        console.error(err);
      });
    res.send("Check");
  });
})

app.use(express.static("public"))
app.listen(port);
console.log("App listening on port " + port);