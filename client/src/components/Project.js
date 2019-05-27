import React, { Component }  from 'react';
import { connect } from 'react-redux';
import { fetchProjectList,fetchProjectDetail,setLoading } from '../actions';
import { Spin } from 'antd'; 
import $ from 'jquery';

class Project extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  componentDidMount = () =>{
    this.props.getProjectList();
  }

  showDetail =(e)=> {
    let pid = $(e.currentTarget).data('id')
    this.props.getProjectDetail(pid);
    this.setState({show: true})
  }

  closeDetail =(e)=> {
    this.setState({show: false})
  }

  getProject = (e) => {
    let ret = [], list = [],cur;
    e.map((item,i)=>{
      let year = item.date.split('-')[0];
      if (i===0) {
        list.push(item);
      }else{
        if (cur === year) {
          list.push(item);
        }else{ 
          ret.push( {"year":cur, "list":list} );
          list = [];
          list.push(item);
        }
      }
      cur = year;
      return 0;
    })
    ret.push( {"year":cur, "list":list} );
    return ret;
  }

  render() {  
    let pm = { name:null,pname:null,date:null,desc:null,type:null,plat:null,tech:null}
    let { show } = this.state;
    let { projectList,projectDetail,loading } = this.props;
    projectList = (typeof(projectList)==='undefined')?[]:projectList;
    projectDetail = (typeof(projectDetail)==='undefined')?pm:projectDetail;
    projectDetail.techList = (projectDetail.tech!==null)?projectDetail.tech.split('/'):[];
    let ret = this.getProject(projectList);

    return (
      <div className="g-proj">
        {loading?<div className="loading"><Spin size="large" spinning={loading}/></div>:''}
        <div className={show?"m-proj-detail":"m-proj-detail fn-hide"}>
          <div className="m-proj-wrap">
            <div className="m-close" onClick={this.closeDetail}></div>
            <div className="m-detail-info">
              <span className="m-title">{projectDetail.pname} [{projectDetail.plat}]</span>
              <span className="m-type">{projectDetail.type}</span>
            </div>
            <div className="m-detail-sub">
              <span className="m-tech">
                {projectDetail.techList.map((item,i)=>{
                  return (<i key={i}>{item}</i>)
                })}
              </span>
              <span className="m-date">{projectDetail.date}</span>
            </div>
            <div className="m-detail-link">
              <span><svg height="16" className="octicon octicon-mark-github" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true"><path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg></span>
              <label><a href={projectDetail.code} target="_blank" rel="noopener noreferrer">{projectDetail.name}</a></label>
            </div>
            <div className="m-detail-cnt">
              <div className="markdown-body" dangerouslySetInnerHTML = {{ __html:projectDetail.desc }}></div>
            </div>
          </div>
        </div>
        {ret.map((item,i)=>{
          return (
            <div className="m-proj-row" key={i}>
              <div className="m-proj-y">{item.year}</div>
                {item.list.map((obj,j)=>{
                  return (
                  <div className="m-proj-item" key={j} data-id={`${obj.date}#${obj.pname}`} onClick={this.showDetail}>
                    <span className="u-date">{obj.date}</span>
                    <span className="u-name">{obj.pname} [{obj.plat}]</span>
                    <span className="u-tech">{obj.tech}</span>
                  </div> 
                  )
                })}
            </div>
          )
        })
        }
      </div>
    )
  }
}

const mapStateToProps  = (state) => ({
  projectList: state.projectList,
  projectDetail: state.projectDetail,
  loading: state.loading,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getProjectList: () => {
      dispatch( setLoading() );
      dispatch(fetchProjectList());
    },
    getProjectDetail: (pid) => {
      dispatch( setLoading() );
      dispatch(fetchProjectDetail(pid));
    },
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Project);
