'use strict';
var mp = require('mongodb-promise');
var config = require('../config/config.json')


// Insert documents 
var insertDocuments = function(jsonList, collection, cb){
    mp.MongoClient.connect(config.db.address)
        .then(function(db){
            return db.collection(collection)
                .then(function(col) {
                    return col.insert(jsonList)
                        .then(function(result) {
                            cb(result);
                            db.close();
                        })
                })
        })
        .fail(function(err) {console.log(err);});
}

// Read all documents 
var readDocuments = function(jsonToFind, collection, cb){
    mp.MongoClient.connect(config.db.address)
        .then(function(db){
            return db.collection(collection)
                .then(function(col) {
                    return col.find(jsonToFind).toArray()
                        .then(function(items) {
                            cb(items);
                            db.close();
                            return items;
                        })
                })
        })
        .fail(function(err) {console.log(err)});
}


module.exports.insertDocuments = insertDocuments;
module.exports.readDocuments = readDocuments;