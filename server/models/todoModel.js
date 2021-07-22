const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = Schema({
  index : {type: Number, required: true, unique: true},
  description: {type: String, required: true},
  completed: {type: Boolean, default: false},
})

module.exports = new mongoose.model('Todo', todoSchema)