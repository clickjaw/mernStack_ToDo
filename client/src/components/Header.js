import React, { Component } from "react";

import axios from "axios";

import Card from "react-bootstrap/Card"

const API_URL = `http://localhost:3004/todo`; // fetch all employee - p -

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toDoList: [],
    //   showUpdateForm: false,
    //   employeeId: "", // employee to be updated
    };
  }

  // to run when after app's first render
  componentDidMount() {
    this.getToDo();
  }

  // fetch all employees
  async getToDo() {
    try {
      const response = await axios.get(API_URL);
      this.setState({ toDoList: response.data });
    } catch (error) {
      console.error(error);
    }
  }

  // what happens after form is submitted
  handleCreateForm = (event) => {
    event.preventDefault();
    // create an object with the required fields for our model
    const newInfo = {
      toDoChore: event.target.toDoChore.value,
      toDoDate: event.target.toDoDate.value,
    };
    this.handleCreate(newInfo); // pass this into our create function!
  };

  handleCreate = async (info) => {
    // we need to access our route to the post method.
    const URL = `http://localhost:3004/new-todo`;
    // our fist param is the URL, second is the JSON body!
    const response = await axios.post(URL, info);
    // this is the data we need to set the state with our new post
    const newToDo = response.data;
    this.setState(
      {
        toDo: [...this.state.toDoList, newToDo],
      },
      () => this.getToDo()
    ); // running a callback after the state is updated. takes a while ;)
  };
  render() {
    return (
      <>
        <button onClick={this.getToDo}>To Do</button>

        {this.state.toDoList.map((obj) => (
          <Card style={{ margin: "10px", padding: "10px" }}>
            {/* dueDate =  */}
            <Card.Title>{obj.dueDate}</Card.Title>
            {/* description =  */}
            <Card.Text>{obj.toDoDescription}</Card.Text>
            <Card.Footer>{obj.complete}</Card.Footer>
          </Card>
        ))}
        <form onSubmit={this.handleCreateForm}>
          <input type="text" name="toDoChore" placeholder = "chore"/>
          <input type="date" name="toDoDate" placeholder = "date"/>
          <button type="submit">Submit</button>
        </form>
      </>
    );
  }
}
