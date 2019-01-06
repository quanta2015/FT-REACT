import React, { Component }  from 'react';
import { connect } from 'react-redux';
import Footer from './Footer';
import { fetchProjectList,setLoading } from '../actions';

import db from '../data/data';

import cImg from '../img/mc-c.png';
import webImg from '../img/mc-web.png';
import cloudImg from '../img/mc-cloud.png';
import reactImg from '../img/mc-react.jpg';
import sysImg from '../img/sys.svg';
import conf from '../config';


class Home extends Component {

  componentDidMount = () =>{
    this.props.getProjectList();
  }

  render() {  
    let {projectList}  = this.props;
    projectList = (typeof(projectList)==='undefined')?[]:projectList;
    let stList = db.student;
    let hostPre = conf.host + "img/";


    console.log(projectList)

    return (
      <div className="g-home">
        <div className="m-cnt">
          <div className="m-cur">
            <div className="m-title">
              AI英语面试系统 
            </div>
            
            <div className="m-desc">
              <span>React && Redux 框架</span>
              <span>Tensorflow 深度学习算法</span>
              <span>Google Word2Vex 算法</span>
              <span>讯飞语音识别引擎</span>
            </div>
            <div className="m-pic">
              <img src={sysImg} alt=""/>
            </div>
          </div>

          <div className="m-proj">
            {projectList.reverse().slice(0,10).map((item,i)=>{
              return(
                <div className="m-proj-item" key={i}>
                <span className="m-date">{item.date} </span>
                <span>{item.pname}</span>
              </div>
              )
            })}
          </div>

          <div className="m-mooc">
            <div className="m-mooc-item">
              <img src={cImg} alt=""/>
              <span>C 程 序 设 计</span>
            </div>
            <div className="m-mooc-item">
              <img src={webImg} alt=""/>
              <span>Web 程 序 设 计</span>
            </div>
            <div className="m-mooc-item">
              <img src={cloudImg} alt=""/>
              <span>云 计 算 技 术</span>
            </div>
            <div className="m-mooc-item">
              <img src={reactImg} alt=""/>
              <span>任务驱动式前端程序设计</span>
            </div>
          </div>

          <div className="m-st">
            {stList.map((item,i)=>{
              return(
                <div className="m-st-item" key={i}>
                  <img src={hostPre+item.img} alt=""/>
                  <span>{item.name}</span>
                </div>
              )
            })}
          </div>
        </div>
        
        <Footer/>
      </div>
    )
  }
}

const mapStateToProps  = (state) => ({
  evaltask: state.evaltask,
  idx: state.idx, 
  projectList: state.projectList,
  loading: state.loading,
});

const mapDispatchToProps=(dispatch)=>{
  return {
    getProjectList: () => {
      dispatch( setLoading() );
      dispatch(fetchProjectList());
    },
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Home);

