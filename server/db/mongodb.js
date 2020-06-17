const MongoClient = require("mongodb").MongoClient;
const ObjectID = require('mongodb').ObjectID;

const dbname = "unit";
const url = "mongodb://82.146.40.11:27017";
const mongoOptions = { useNewUrlParser: true };

let db = null

const connect = callback => {
    // if state is not NULL. Means we have connection already, call our CB
    if (db)
        callback();
    else {
        // attempt to get database connection
        MongoClient.connect(url, mongoOptions, (err, client) => {
            // unable to get database connection pass error to CB
            if (err)
                callback(err);
            // Successfully got our database connection. Set database connection and call CB
            else {
                db = client.db(dbname);
                console.log('good')
                callback();
            }
        });
    }
}

// returns OBJECTID object used to 
const getPrimaryKey = (_id) => {
    return ObjectID(_id);
}

// returns database connection 
const getDB = () => db


module.exports = { getDB, connect, getPrimaryKey };