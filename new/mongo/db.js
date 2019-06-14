const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/course',{
    useNewUrlParser:true,
    useCreateIndex: true
})

const db = mongoose.connection


db.on('connected', function () {
    console.log('Mongoose connection')
})

// If the connection throws an error
db.on('error', function (err) {
    console.log('Mongoose connection error: ' + err)
})

// When the connection is disconnected
db.on('disconnected', function () {
    console.log('Mongoose connection disconnected')
})

module.exports = db; // 导出