const mongoose = require('mongoose')

const mongo = mongoose.connect('mongodb://localhost:27017/authdb')

const db = mongoose.connection

db.once('open', () => {  console.log("Database connected successfly")  })

module.exports = mongo