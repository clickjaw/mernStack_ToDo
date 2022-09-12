import React, { Component } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form"

export default class AllToDo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toDoList: [],
    };
  }

  componentDidMount() {
    this.getToDo();
  }

  getToDo = async () => {
    const API = "http://localhost:3005/todos";
    let res = await axios.get(API);
    this.setState({
      toDoList: res.data,
    });
    // console.log(this.description)
    // this.setState({dueDate: res.dueDate})
    console.log(this.state.toDoList);
  };
  // console.log(this.description)
  // this.setState({dueDate: res.dueDate})

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
    this.setState({ toDo: [...this.state.toDoList, newToDo] }, () =>
      this.getToDo()
    );
  };

  handleDelete = async (itemDelete) => {
    const url = `http://localhost:3005/todo/${itemDelete}`; // finds the ObjectID for us :0
    console.log(itemDelete);
    try {
      const response = await axios.delete(url);
      console.log(response.data);
      const filteredOut = this.state.toDoList.filter(
        (obj) => obj._id !== itemDelete
      );
      this.setState({ toDoList: filteredOut }); // auto rerender
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <>
        <Form onSubmit={this.handleCreateForm} style = {{display: 'grid', justifyContent:'center', margin: '10px', padding: '10px'}}>
          <input
            type="text"
            name="toDoDescription"
            placeholder="Enter a Chore"
          />
          <input type="date" name="dueDate" placeholder="Due Date" />
          <Button type="submit">Submit</Button>

        </Form>
        {this.state.toDoList.map(obj=>(

              <Card key = {obj._id} style = {{display: 'grid', justifyContent:'center'}}>
              <Card.Title>{obj.dueDate}</Card.Title>
              <Card.Text>{obj.toDoDescription}</Card.Text>
              <Button onClick={() => this.handleDelete(obj._id)}>Delete</Button>
              </Card>
        ))}
      </>
      
    );
  }
}
