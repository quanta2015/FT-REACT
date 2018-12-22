import React, { Component }  from 'react';
import { connect } from 'react-redux';
import db from '../data/data';
import $ from 'jquery';
import { fetchNoteList, fetchNoteDetail, doLogout, uploadFile } from '../actions';
import conf from '../config';


class Student extends Component {

  constructor(props) {
    super(props);
    this.state = {st:null, cur:'sys'};
  }

  componentDidMount = () =>{
    this.props.getNoteList('sys');
  }

  showStInfo = (e) => {
    let id = $(e.currentTarget).data('id');
    let st = db.student[id];
    this.setState( { student: st, cur: st.data });
    this.props.getNoteList(st.data);
  }

  noteClick = (e) => {
    let id = this.state.cur;
    let mid = $(e.currentTarget).data('id');
    let name = this.props.noteList[mid];
    this.props.getNoteDetail(id,name);
  }

  doUpload = (e)=> {
    let id = this.props.login.data.user;
    let file = e.currentTarget.files[0];
    this.props.uploadFile(file,id);
  }

  doLogout = (e) => {
    this.props.doLogout();
    this.props.history.push('/')
  }

  render() {  
    const {isLogin}=this.props;

    let stImg = "#";
    let tech = [];
    let stList = db.student;
    let hostPre = conf.host + 'img/';
    let { student } = this.state;
    let { noteList,noteDetail } = this.props;

    if ((typeof(noteList)==='undefined')) {
      noteList = [];
    }
    
    if ((student !== null)&&(typeof(student)!=='undefined')) {
      stImg = student.img;
      tech = student.techList;
    }

    for(let i=0;i<stList.length;i++) {
      let techArr = [];
      stList[i].tech.split('/').forEach(v=>{
        techArr.push({"val":v,"cls":"m-"+v})
      });
      stList[i].techList = techArr;
    }

    return (
      <div className="g-st">
        <div className="m-bar">
            <div className="m-st-logo">
              <img src={hostPre+stImg} alt=""/>
            </div>
            <div className="m-st-tech">
              {tech.map((item,i)=>{
                return(
                  <span className={"m-tech " + item.cls} key={i}>{item.val}</span>
                )
              })}
            </div>
            {isLogin?(
            <div className="m-func">
              
              <button>
               <input type="file" onChange={this.doUpload}/>
                Upload Note
              </button>
              <button>Edit Note</button>
              <button>Delete Note</button>
              <button onClick={this.doLogout}>Logo Out</button>
            </div>):''}
          
        </div>
        <div className="m-list">
          <div className="m-notelist">
              {noteList.map((item,i)=>{
                return(
                  <div className="m-noteitem">
                    <span>{item.split('@')[0]}</span>
                    <a href="#{i}"  key={i} data-id={i} onClick={this.noteClick}>{item.split('@')[1]}</a>
                  </div>
                )
              })}
          </div>
        </div>
        <div className="m-main">
          <div className="markdown-body" dangerouslySetInnerHTML = {{ __html:noteDetail }}></div>
        </div>
        <div className="m-st-list">
          {stList.map((item,i)=>{
            return(
              <div className="m-st-item" key={i} onClick={this.showStInfo} data-id={i}>
                <img src={hostPre+item.img} alt=""/>
                <span>{item.name}</span>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps  = (state) => ({
  noteList: state.noteList,
  noteDetail: state.noteDetail,
  isLogin: state.isLogin,
  login: state.login,
  file: state.file
});

const mapDispatchToProps = (dispatch) => {
  return {
    getNoteList: (id) => {
      dispatch(fetchNoteList(id));
    },
    getNoteDetail: (id,name) => {
      dispatch(fetchNoteDetail(id,name));
    },
    doLogout: ()=> {
      dispatch(doLogout());
    },
    uploadFile: (file,id) => {
      dispatch(uploadFile(file,id));
    }
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Student);

