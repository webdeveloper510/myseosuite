const mongoose = require('mongoose');

exports.mongoConnection = (mongoURI) => {
    return mongoose.connect(mongoURI);
}