import React, { Component }  from 'react';
import { connect } from 'react-redux';
import Footer from './Footer';
import { fetchProjectList,fetchNoteList,setLoading } from '../actions';
import { Pagination,Spin } from 'antd';
import $ from 'jquery';
import db from '../data/data';

import cImg from '../img/sys/mc-c.png';
import webImg from '../img/sys/mc-web.png';
import cloudImg from '../img/sys/mc-cloud.png';
import reactImg from '../img/sys/mc-react.jpg';
import conf from '../config';

import Hammer from 'hammerjs';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cur:'sys', 
      index: 1,
    };
  }
  
  onChangePage = (e) => {
    this.setState({index: e});
  }

  componentDidMount = () =>{
    this.props.getProjectList();
    this.props.getNoteList('sys');

    var p = document.querySelector('.m-st');
    var stw = document.querySelector('.m-st-wrap');
    var manager = new Hammer.Manager(stw);
    var wide = p.clientWidth - stw.clientWidth;
    manager.add(new Hammer.Swipe());
    manager.on('swipe', function(e) {
      var offset; 
      if (e.offsetDirection === 4) {
        offset = stw.offsetLeft + e.deltaX ;
        offset = (offset>5)?5:offset;
        stw.style.left = offset + 'px';
      }else if(  e.offsetDirection === 2 ) {
        offset = stw.offsetLeft + e.deltaX ;
        offset = (offset<wide)?wide:offset;
        stw.style.left = offset + 'px';
      }
    })
  }

  noteClick = (e) => {
    let id = this.state.cur;
    let mid = $(e.currentTarget).data('id');
    let name = this.props.noteList[mid];
    let mp =  `${id}|${name}`;

    var win = window.open(`/art/${mp}`, '_blank');
    win.focus(); 
  }

  //显示当前用户文章
  showStInfo = (e) => {
    let id = $(e.currentTarget).data('id');
    let st = db.student[id+1];
    this.setState( { student: st, cur: st.data });
    this.props.getNoteList(st.data);
  }


  render() {  
    let stList = db.student;
    let hostPre = conf.host + "img/sys/";
    let total;
    let data = [];
    const PAGE_SIZE = conf.pagesize;
    let { index } = this.state;
    let {projectList,noteList,loading}  = this.props;
    projectList = (typeof(projectList)==='undefined')?[]:projectList;
    
    if ((typeof(noteList)==='undefined')) {
      noteList = [];
      total = 0;
    }else{
      total = noteList.length;
      for(var i=0;i<PAGE_SIZE;i++) {
        var offset = (index-1)*PAGE_SIZE;
        if (offset + i>=noteList.length) break;
        var item = noteList[i + offset];
        data.push(item);
      }
    }

    return (
      <div className="g-home">
        {loading?<div className="loading"><Spin size="large" spinning={loading}/></div>:''}
        <div className="m-cnt">
          <div className="m-cur">
            <div className="m-notelist">
              {data.map((item,i)=>{
                return(
                  <div className="m-noteitem" key={i}  data-id={i+(index-1)*PAGE_SIZE} onClick={this.noteClick}>
                    <span>{item.split('@')[0]}</span>
                    <a href="#{i}" >{item.split('@')[1]}</a>
                  </div>
                )
              })}
            </div>
            <Pagination size="large" onChange={this.onChangePage} total={total} defaultPageSize={PAGE_SIZE}/>
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
            <div className="m-st-wrap">
            {stList.slice(1).map((item,i)=>{
              return(
                <div className="m-st-item" key={i} onClick={this.showStInfo} data-id={i}>
                  <img src={hostPre+item.img} alt="" />
                  <span>{item.name}</span>
                </div>
              )
            })}
            </div>
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
  noteList: state.noteList,
});

const mapDispatchToProps=(dispatch)=>{
  return {
    getProjectList: () => {
      dispatch( setLoading() );
      dispatch(fetchProjectList());
    },
    getNoteList: (id) => {
      dispatch( setLoading() );
      dispatch(fetchNoteList(id));
    },
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);

