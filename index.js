var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 8080;
var path = require('path');
var watermark = require('image-watermark');
var Jimp = require('jimp');


let imgRaw = './public/src/chitwan.jpg'; //a 1024px x 1024px backgroound image
let imgLogo = './public/img/logo.png'; //a 155px x 72px logo
let imgExported = './public/src/image1.jpg';
let textData = {
  text: '© JKRB Investments Limited', //the text to be rendered on the image
  maxWidth: 1004, //image width - 10px margin left - 10px margin right
  maxHeight: 72 + 20, //logo height + margin
  placementX: 10, // 10px in on the x axis
  placementY: 1024 - (72 + 20) - 10 //bottom of the image: height - maxHeight - margin 
};


app.get('/watermark', function (req, res) {
  Jimp.read(imgRaw)
    .then(tpl =>
      Jimp.read(imgLogo).then(logoTpl => {
        logoTpl.opacity(0.4);
        return tpl.composite(logoTpl,
          Jimp.AUTO,
          Jimp.AUTO,
          Jimp.HORIZONTAL_ALIGN_CENTER
          | Jimp.VERTICAL_ALIGN_MIDDLE);
      }))
    .then(tpl => (
      Jimp.loadFont(Jimp.FONT_SANS_32_WHITE).then(font => ([tpl, font]))
    ))
    .then(data => {
      tpl = data[0];
      font = data[1];
      return tpl.print(font, textData.placementX, textData.placementY, {
        text: textData.text,
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
      }, textData.maxWidth, textData.maxHeight);
    })
    .then(tpl => (tpl.quality(100).write(imgExported)))
    .then(tpl => {
      console.log('exported file: ' + imgExported);
    })
    .catch(err => {
      console.error(err);
    });
  res.send("Check");
})

app.use(express.static("public"))
app.listen(port);
console.log("App listening on port " + port);