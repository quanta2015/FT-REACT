import React, { Component } from 'react';
import {  Route,Link } from "react-router-dom";
import { connect } from 'react-redux';
import Home from "./components/Home";
import Project from "./components/Project";
import Mooc from "./components/Mooc";
import Student from "./components/Student";
import About from "./components/About";
import Login from "./components/Login/Login";
import PPT from "./components/Ppt";
import Art from "./components/Art";
import { withRouter } from 'react-router';
import { fetchCount } from './actions';

import logob from './img/sys/logob.svg';
import logoc from './img/sys/logoc.svg'

import $ from 'jquery';

class App extends Component {

  componentDidMount = () =>{
    this.props.getCount();
  }

  toggleMenu = () => {
    $('.m-menu-sel').slideToggle('collapse');
  }

  render() {
    let { isLogin,count } = this.props;

    return (
      <div className="App">
        <div className="m-nav">
          <div className="m-nav-wrap">
            <div className="m-logo">
              <Link to="/Login"> 
              {isLogin?<img src={logoc}  alt=""/>:<img src={logob}  alt=""/>}
              </Link>
              <label>F</label>
              <span>ront-Tech</span>
            </div>
            <div className="m-count"><span>{count}</span></div>
            <div className="m-menu">
              <Link to="/">Home</Link>
              <Link to="/project">Project</Link>
              <Link to="/mooc">Mooc</Link>
              <Link to="/student">Student</Link>
              <Link to="/about">About</Link>
            </div>
            <button type="button" className="m-menu-t" onClick={this.toggleMenu}>
              <span></span><span></span><span></span>
            </button>
          </div>
          
          <div className="m-menu-sel" onClick={this.toggleMenu}>    
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/project">Project</Link></li>
              <li><Link to="/mooc">Mooc</Link></li>
              <li><Link to="/about">About</Link></li>
            </ul>
          </div>
        </div>

        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/project" component={Project} />
        <Route exact path="/mooc" component={Mooc} />
        <Route exact path="/student" component={Student} />
        <Route exact path="/about" component={About} />
        <Route exact path="/ppt/:id" component={PPT} />
        <Route exact path="/art/:id" component={Art} />
      </div>
    );
  }
}

const mapStateToProps  = (state) => ({
  isLogin: state.isLogin,
  count: state.count,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getCount: () => {
      dispatch(fetchCount());
    }
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
