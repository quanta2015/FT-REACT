import React, { Component }  from 'react';
import { connect } from 'react-redux';
import db from '../data/data';
import $ from 'jquery';
import { fetchNoteList, fetchNoteDetail, doLogout, uploadFile, fetchMDDetail,saveMD } from '../actions';
import conf from '../config';
import {toastIt} from '../components/Toastr/toastr';

var _cur_file_name;

class Student extends Component {

  constructor(props) {
    super(props);

    //初始化默认用户sys
    this.state = {
      st:null, 
      cur:'sys', 
      isEdit: false, 
      mdDetail: this.props.mdDetail
    };
  }

  //同步state和props的mdDetail
  componentWillReceiveProps(nextProps) {
    if (nextProps.mdDetail !== this.props.mdDetail) {
      this.setState({
        mdDetail: nextProps.mdDetail
      });
    }
  }

  componentDidMount = () =>{
    //取系统用户文章列表
    this.props.getNoteList('sys');
  }

  //显示当前用户文章
  showStInfo = (e) => {
    let id = $(e.currentTarget).data('id');
    let st = db.student[id];
    this.setState( { student: st, cur: st.data });
    this.props.getNoteList(st.data);
  }

  //显示点击文档内容
  noteClick = (e) => {
    if (this.state.isEdit) return;

    //设置当前激活状态
    $(".m-noteitem").removeClass("fn-active");
    $(e.currentTarget).parent().addClass("fn-active");

    //根据选择id取后台文章内容
    let id = this.state.cur;
    let mid = $(e.currentTarget).data('id');
    let name = this.props.noteList[mid];
    _cur_file_name = name;
    this.props.getNoteDetail(id,name);
  }

  //上传MD格式文档
  doUpload = (e)=> {
    let id = this.props.login.data.user;
    let file = e.currentTarget.files[0];
    this.props.uploadFile(file,id);
  }

  //登出系统
  doLogout = (e) => {
    this.props.doLogout();
    this.props.history.push('/')
  }

  //编辑文章
  doEdit = (e) => {
    //判断是否选择文章
    if (_cur_file_name == null) {
      toastIt("请选择文章！");
      return;
    }
    //取后台md数据
    let id = this.state.cur;
    this.props.getMDDetail(id,_cur_file_name);
    this.setState( {isEdit:true} );
  }

  //保存编辑md数据
  doSave = (e) => {
    this.setState( {isEdit:false} );

    let id = this.state.cur;
    let md = $(".m-edit-body textarea").val();
    this.props.saveMDDetail(id,_cur_file_name,md);
  }

  onChange = e => this.setState({ mdDetail: e.target.value })

  render() {
    let stImg = "#";
    let tech = [];
    let stList = db.student;
    let hostPre = conf.host + 'img/';
    let { student,isEdit,mdDetail } = this.state;
    let { noteList,noteDetail,isLogin } = this.props;

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
            <button className={isEdit?'fn-hide':''}>
              <input type="file" onChange={this.doUpload}/>Upload Note</button>
            <button onClick={this.doEdit} className={isEdit?'fn-hide':''}>Edit Note</button>
            <button onClick={this.doSave} className={!isEdit?'fn-hide':''}>Save Note</button>
            <button className={isEdit?'fn-hide':''}>Delete Note</button>
            <button onClick={this.doLogout} className={isEdit?'fn-hide':''}>Logo Out</button>
          </div>):''}
           
        </div>
        <div className="m-list">
          <div className="m-notelist">
            {noteList.map((item,i)=>{
              return(
                <div className="m-noteitem" key={i} >
                  <span>{item.split('@')[0]}</span>
                  <a href="#{i}"  data-id={i} onClick={this.noteClick}>{item.split('@')[1]}</a>
                </div>
              )
            })}
          </div>
        </div>
        <div className="m-main">
          {!isEdit?(
            <div className="m-md-body" dangerouslySetInnerHTML = {{ __html:noteDetail }}></div>
          ):(
            <div className="m-edit-body">
              <textarea value={this.state.mdDetail} onChange={this.onChange} ></textarea>
            </div>
          )}
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
  file: state.file,
  mdDetail: state.mdDetail
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
    },
    getMDDetail: (id,name) => {
      dispatch(fetchMDDetail(id,name));
    },
    saveMDDetail: (id,name,md) => {
      dispatch(saveMD(id,name,md));
    },
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Student);

