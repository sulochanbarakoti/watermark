var watermark = require('image-watermark');
var path = require('path')

watermark.embedWatermark(path.resolve(__dirname, './Resume.pdf'), {
    'text': 'sample watadasdermark',
    'color': '#ff000033'
}, function (err) {
    if (!err)
        console.log('Succefully embeded watermark');
});

