const mongoClient = require('mongodb').MongoClient;
const state = {
    db:null
}
module.exports.connect = (callback_done) => {
    const url = 'mongodb://localhost:27017';
    const dbname = 'shopping';

    mongoClient.connect(url,(err, data) => {
        if(err) return callback_done(err);
        state.db = data.db(dbname);
        callback_done();
        // this is called in case of no error
    })
    
}

module.exports.get = () => {
    return state.db;
}
