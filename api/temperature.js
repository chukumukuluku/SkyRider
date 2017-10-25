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
            var tempratureInfo = {};
            tempratureInfo.header = elements[0];
            tempratureInfo.tempratureDetailsList = [];
            var tempratures = elements.slice(2, 7);
            tempratures.forEach(function(temprature) {
                var temprature = temprature.split('\n');
                var tempratureDetails = {}
                tempratureDetails.day = temprature[0];
                tempratureDetails.date = temprature[1];
                tempratureDetails.temprature = temprature[2].split(' /');
                tempratureDetails.description = temprature[3];
                tempratureInfo.tempratureDetailsList.push(tempratureDetails);
                console.log(tempratureDetails);
            });
            res.send(tempratureInfo);
        })
        .end();
});

module.exports = router;



