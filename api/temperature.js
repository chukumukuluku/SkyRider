'use strict';
var express = require('express');
var router = express.Router();
var webdriverio = require('webdriverio');
var db = require('../libs/db');
var config = require('../config/config.json')


var options = {
    desiredCapabilities: {
        browserName: 'chrome'
    }
};

router.get('/getTemperature/', function(req, res, next) {
    var browser = webdriverio.remote(options)
        .init()
        .url(config.thirdPartyUrl)
        .getText('.day').then(function(elements){
            var tempratureInfo = [];
            var tempratures = elements.slice(2, 7);
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

router.get('/getTemperatureByDB/', function(req, res, next) {
    db.readDocuments({}, 'temperature', function(data){
        res.send(data[0].temperatureList);
    });
});

module.exports = router;