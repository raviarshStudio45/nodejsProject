const express = require("express");
const Register = require("./schema");
var cors = require("cors");
const db = require("./db");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/get-notes", async (req, res) => {
  // const note = req.body;
  try {
    let notes = await Register.find();
    res.status(201).json(notes);
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/delete-note/:id", async (req, res) => {
  const id = req.params;
  try {
    let notes = await Register.findByIdAndDelete({ noteID });
    res.status(201).json(notes);
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
app.post("/add-note", async (req, res) => {
  const note = req.body;

  if (Object.keys(note).length != 0) {
    try {
      const register = new Register(note);
      await register.save();
      res.status(201).json({ message: "Note added successfully", note });
    } catch (error) {
      console.error("Error", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(400).json({ message: "Bad Request. Note is required." });
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
