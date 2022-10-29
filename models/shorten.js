const mongoose = require("mongoose")
const Schema = mongoose.Schema

const shortenSchema = new Schema({
  input: { type: String},
  output: { type: String},
  
})

module.exports = mongoose.model("Short", shortenSchema)