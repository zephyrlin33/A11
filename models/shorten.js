const mongoose = require("mongoose")
const Schema = mongoose.Schema

const shortenSchema = new Schema({
  input: { type: String, require: true,unique: true},
  output: { type: String, require: true,unique: true},
  
})

module.exports = mongoose.model("Short", shortenSchema)