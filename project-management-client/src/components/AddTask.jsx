// components/projects/AddTask.js

import React, { Component } from "react";
import axios from "axios";

class AddTask extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "", description: "", projectID: "" };
  }

  handleFormSubmit = event => {
    event.preventDefault();
    // const {title, description} = this.state;
    const title = this.state.title;
    const description = this.state.description;
    const projectID = this.props.projectID;

    //console.log(this.props);
    //console.log(this.state);

    axios
      .post("http://localhost:5000/api/tasks", {
        title,
        description,
        projectID
      })
      .then(() => {
        this.props.getSingleProject();
        this.setState({ title: "", description: "", projectID: "" });
      })
      .catch(error => console.log(error));
  };

  handleChange = event => {
    const { name, value } = event.target;
    //   ^ this is just fancy syntax for the 2 lines below
    //   const name = event.target.name;
    //   const value = event.target.value;

    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={e => this.handleChange(e)}
          />
          <label>Description:</label>
          <textarea
            name="description"
            value={this.state.description}
            onChange={e => this.handleChange(e)}
          />

          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default AddTask;
