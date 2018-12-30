import React, { Component } from 'react';
import {  Route,Link } from "react-router-dom";
import { connect } from 'react-redux';
import Home from "./components/Home";
import Project from "./components/Project";
import Mooc from "./components/Mooc";
import Student from "./components/Student";
import About from "./components/About";
import Login from "./components/Login/Login";
import { withRouter } from 'react-router'

import logob from './img/logob.svg';
import logoc from './img/logoc.svg'

class App extends Component {

  render() {
    let { isLogin } = this.props;

    return (
      <div className="App">
        <div className="m-nav">
          <div className="m-logo">
            <Link to="/Login"> 
            {isLogin?<img src={logoc}  alt=""/>:<img src={logob}  alt=""/>}
            
            </Link>
            <label>F</label>
            <span>ront-Tech</span>
          </div>
          <div className="m-menu">
            <Link to="/">Home</Link>
            <Link to="/project">Project</Link>
            <Link to="/mooc">Mooc</Link>
            <Link to="/student">Student</Link>
            <Link to="/about">About</Link>
          </div>
        </div>

        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/project" component={Project} />
        <Route exact path="/mooc" component={Mooc} />
        <Route exact path="/student" component={Student} />
        <Route exact path="/about" component={About} />
      </div>
    );
  }
}

const mapStateToProps  = (state) => ({
  isLogin: state.isLogin
});

export default withRouter(connect(mapStateToProps)(App));
