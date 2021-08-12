import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import NavBar from "./navBar";
import AddtaskForm from "./addTaskForm";
import Home from "./home";

class MainComponent extends Component {
  render() {
    return (
      <div className="contianer-fluid">
        <NavBar />
        <Switch>
          <Route path="/edit/task/:id" component={AddtaskForm} />
          <Route path="/add/task" component={AddtaskForm} />
          <Route path="/home" component={Home} />
          <Redirect from="/" to="/home" />
        </Switch>
      </div>
    );
  }
}
export default MainComponent;
