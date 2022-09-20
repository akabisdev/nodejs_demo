
const { MongoClient } = require('mongodb');

const mongoose = require('mongoose');

const connectionString = 'mongodb://localhost:27017/mydb';
const client = new MongoClient(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let dbConnection;

module.exports = {
    connectToServer: function (callback) {
        // client.connect(function (err, db) {
        //     if (err || !db) {
        //         return callback(err);
        //     }

        //     dbConnection = db.db('mydb');
        //     console.log('Successfully connected to MongoDB.');

        //     // return callback();
        // });
        mongoose.createConnection(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }, (error, result) => {
            if (error) {
                console.log(`${error.toString()}`);
            } else {
                dbConnection = result.db;
                console.log('Database connected successfully');
            }
        });
    },

    getDb: function () {
        return dbConnection;
    },
};