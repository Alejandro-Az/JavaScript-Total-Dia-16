const {MongoClient} = require('mongodb');
const client = new MongoClient('mongodb://127.0.0.1:27017/colegio');

const conexionDB = () => {
    return client.connect()
    .then((dbClient) => {return dbClient;})
    .catch((error) => {return error;})
}

module.exports = conexionDB;
