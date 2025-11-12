const mongoose = require('mongoose')

async function connectMongoDb(URL) {
    await mongoose.connect(URL)
}

module.exports ={
    connectMongoDb,
}