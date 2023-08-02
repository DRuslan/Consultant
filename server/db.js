const { MongoClient } = require('mongodb');

const URL = 'mongodb://localhost:27017/users';

let dbConnection;

module.exports = {
    connectToDb: (callBack) => {
        MongoClient
            .connect(URL)
            .then((client) => {
                console.log('Connected to MongoDB');
                dbConnection = client.db();
                return callBack();
            })
            .catch((err) => {
                return callBack(err);
            })
    },
    getDb: () => dbConnection,
}