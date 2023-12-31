const mongoose = require("mongoose");

const connectionString = "mongodb://127.0.0.1:27017/social_media";

mongoose.connect(connectionString);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

module.exports = db;
