const mongoose = require('mongoose');

const mongo = () => {
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
    })
        .then(() => {
            console.log("MongoDB Connected Success".green.bold)
        })
        .catch(err => {
            console.log("Connecting Failed!".red.bold)
        })
}

module.exports = mongo;
