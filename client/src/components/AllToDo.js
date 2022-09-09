import React, { Component } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";

export default class AllToDo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toDoList: []
    };
  }

  componentDidMount() {
    this.getToDo();
  }

  getToDo = async () => {
    const API = "http://localhost:3005/todo";
    let res = await axios.get(API);
    this.setState({
      toDoList: res.data,
    });
    // console.log(this.description)
    // this.setState({dueDate: res.dueDate})
    console.log(this.state.toDoList);
  };

  handleCreateForm = (event) => {
    event.preventDefault();
    // create an object with the required fields for our model
    const newInfo = {
      toDoDescription: event.target.toDoDescription.value,
      dueDate: event.target.dueDate.value,
    };
    this.handleCreate(newInfo); // pass this into our create function!
  };

  handleCreate = async (info) => {
    const URL = `http://localhost:3005/new-todo`;

    const response = await axios.post(URL, info);

    const newToDo = response.data;
    this.setState(
      {
        toDo: [...this.state.toDoList, newToDo],
      },
      () => this.getToDo()
    );
  };

  render() {
    return (
      <div style={{ display: "grid", justifyContent: "center" }}>
        <button onClick={this.getToDo}>To Do</button>
        <form onSubmit={this.handleCreateForm}>
          <input type="text" name="toDoDescription" placeholder="Enter a Chore" />
          <input type="date" name="dueDate" placeholder="Due Date" />
          <button type="submit">Submit</button>
        </form>
        {this.state.toDoList.map((obj) => (
          <Card style={{ margin: "10px", padding: "10px" }}>
            {/* dueDate =  */}
            <Card.Title>{obj.dueDate}</Card.Title>
            {/* description =  */}
            <Card.Text>{obj.toDoDescription}</Card.Text>
            <Card.Footer>{obj.complete}</Card.Footer>
          </Card>
        ))}

        
      </div>
    );
  }
}
