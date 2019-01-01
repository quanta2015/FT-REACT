import React, { Component }  from 'react';
import { connect } from 'react-redux';
import db from '../data/data';

class Project extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  showDetail =(e)=> {
    this.setState({show: true})
  }

  closeDetail =(e)=> {
    this.setState({show: false})
  }

  getProject = (e) => {
    let cur;
    let ret = [], list = [];
    
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

    let { show } = this.state;
    let data = db.project;
    let ret = this.getProject(data);

    return (
      <div className="g-proj">
        <div className={show?"m-proj-detail":"m-proj-detail fn-hide"}>
          <div className="m-proj-wrap">
            <div className="m-close" onClick={this.closeDetail}></div>
            <div className="m-detail-title">xxx</div>
            <div className="m-detail-sub">
              <span className="m-detail-date">2019-01-01</span>
              <span className="m-detail-type">商业</span>
            </div>
            <div className="m-detail-cnt">xxx</div>
          </div>
        </div>
        {ret.map((item,i)=>{
          return (
            <div className="m-proj-row" key={i}>
              <div className="m-proj-y">{item.year}</div>
                {item.list.map((obj,j)=>{
                  return (
                  <div className="m-proj-item" key={j} onClick={this.showDetail}>
                    <span className="u-date">{obj.date}</span>
                    <span className="u-name">{obj.name}</span>
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
  data: state
});


export default connect(mapStateToProps)(Project);

