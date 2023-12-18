const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  tags: {
    type: String,
  },
});

module.exports = mongoose.model("notes", todoSchema);
