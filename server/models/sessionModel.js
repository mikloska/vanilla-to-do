const mongoose = require('mongoose');
const Schema = mongoose.Schema

const sessionSchema= new Schema({
  cookieId: {type:String, required:true, unique: true},
  created: {type:Date, default: Date.now, expires: 20}
})

module.exports = new mongoose.model('Session', sessionSchema)