const mongoose = require('mongoose');


//create a Schema

let ToDoSchema = new mongoose.Schema({
    
    toDoDescription: String,
    dueDate: String
    
})

//create the model

module.exports = mongoose.model('toDoModel', ToDoSchema);

