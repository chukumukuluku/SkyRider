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
        .url('https://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854')
        .getText('.day').then(function(elements){
            
            elements.forEach(function(element) {
                console.log('Element: \n' + element + '\n\n');
            });
        })
        .end();
});

module.exports = router;



