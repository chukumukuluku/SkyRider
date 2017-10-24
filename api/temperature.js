var express = require('express');
var router = express.Router();
var webdriverio = require('webdriverio');

var options = {
    desiredCapabilities: {
        browserName: 'chrome'
    }
};

router.get('/getTemperature/:cityname', function(req, res, next) {
    console.log(req.params.cityname);
    var browser = webdriverio.remote(options)
        .init()
        .url('http://www.ynet.co.il')
        .getTitle().then(function(title) {
            res.send('Title was: ' + title);
        })
        .end();
});

module.exports = router;



