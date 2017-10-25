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
            var tempratureInfo = [];
            var tempratures = elements.slice(4, 9);
            tempratures.forEach(function(temprature) {
                var temprature = temprature.split('\n');
                var tempratureOfDay = {}
                tempratureOfDay.date = temprature[1];
                tempratureOfDay.close = temprature[2].split('° /')[0];
                tempratureInfo.push(tempratureOfDay)
            });
            res.send(tempratureInfo);
        })
        .end();
});

module.exports = router;



