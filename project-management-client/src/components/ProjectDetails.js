// components/projects/ProjectDetails.js

import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import EditProject from "./EditProject";
import AddTask from "./AddTask";

class ProjectDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.getSingleProject();
  }

  printTaks = () => {
    if (this.state.tasks) {
      return (
        <div style={{ width: "60%", float: "left" }}>
          {this.state.tasks.map((task, index) => {
            return (
              <div key={index}>
                <h6 style={{ maxWidth: "400px" }}>
                  the title of the task is: <p>{task.title}</p>
                </h6>
                <h6 style={{ maxWidth: "400px" }}>
                  the Description of the task is: <p>{task.description}</p>
                </h6>
                <button onClick={() => this.deleteTask(task._id)}>
                  Delete Task
                </button>
              </div>
            );
          })}
        </div>
      );
    }
  };

  // DELETE PROJECT:
  deleteTask = id => {
    const { params } = this.props.match;
    axios
      .delete(`http://localhost:5000/api/tasks/${id}`)
      .then(responseFromApi => {
        this.getSingleProject();
        this.props.history.push(`/Projects/${params.id}`); // !!!
      })
      .catch(err => {
        console.log(err);
      });
  };

  getSingleProject = () => {
    const { params } = this.props.match;
    axios
      .get(`http://localhost:5000/api/projects/${params.id}`)
      .then(responseFromApi => {
        const theProject = responseFromApi.data;
        this.setState(theProject);
      })
      .catch(err => {
        console.log(err);
      });
  };

  renderEditForm = () => {
    if (!this.state.title) {
      this.getSingleProject();
    } else {
      //                                                    {...props} => so we can have 'this.props.history' in Edit.js
      //                                                                                          ^
      //                                                                                          |
      return (
        <EditProject
          theProject={this.state}
          getTheProject={this.getSingleProject}
          {...this.props}
        />
      );
    }
  };

  // DELETE PROJECT:
  deleteProject = () => {
    const { params } = this.props.match;
    axios
      .delete(`http://localhost:5000/api/projects/${params.id}`)
      .then(responseFromApi => {
        this.props.history.push("/projects"); // !!!
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <h1>{this.printTaks()}</h1>
        <h1>{this.state.title}</h1>
        <p>{this.state.description}</p>
        <button onClick={() => this.deleteProject()}>Delete project</button>
        {this.renderEditForm()}
        <Link to={"/projects"}>Back to projects</Link>
        <h1>Add Task In Form Below</h1>
        Add
        <AddTask
          projectID={this.state._id}
          getSingleProject={() => this.getSingleProject()}
        />
      </div>
    );
  }
}

export default ProjectDetails;
