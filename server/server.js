const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 3006;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const toDoModel = require("./models/toDoModel");
app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(process.env.DB_CONNECTION_STRING)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.log(err);
  });


app.get("/todos", async (req, res) => {
  const todos = await toDoModel.find({});
  res.send(todos);
});

app.get("/todo", async (req, res) => {
  const { toDoDescription } = req.query; // from the user
  // use the findOne() method
  const todos = await toDoModel.findOne({ toDoDescription: toDoDescription }); // if empty, gets all employees

  res.status(200).send(todos);
});

app.post("/new-todo", async (req, res) => {
  try {
    const newToDo = await toDoModel.create(req.body);
    res.send(newToDo);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating To Do Item");
  }
});

app.delete("/todo/:id", async (req, res) => {
  const id = req.params.id; // From the client

  try {
    await toDoModel.findByIdAndDelete(id);

    // We don't need to send any data, but we do need a success message
    res.send("To Do Item Deleted");
  } catch (error) {
    console.error(error);
    res.status(404).send("Unable to Delete ");
  }
});



app.listen(PORT, () => console.log(`Listening on ${PORT}`)); // run port ONLY AFTER it is connected to MongoDB
