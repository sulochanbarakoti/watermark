var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 8080;
var path = require('path');
var watermark = require('image-watermark');
app.use(express.static(path.join(__dirname, 'public')));

const which = require('which');
const spawn = require('child_process').spawn;
// Find npm in PATH
const npm = which.sync('npm');
// Execute
const noErrorSpawn = spawn(npm, ['install']);


app.get('/watermark', function (req, res) {
  var fs = require('fs');
  var options = {
    'text': 'sample watermark',
    // 'dstPath' : 'watermark.jpg',
  };
  const imagePath = path.resolve(__dirname, './public/src/chitwan.jpg');
  console.log(imagePath);
  if (fs.existsSync(imagePath)) {
    watermark.embedWatermark('./public/src/chitwan.jpg', options);
    // res.send("done")
    // return
    res.send('Hello world');
  } else {
    res.json({ "filesexist": "no" });
  }
});

// app.use(express.static("public"))
app.listen(port);
console.log("App listening on port " + port);