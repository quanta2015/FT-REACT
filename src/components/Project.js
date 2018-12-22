import React, { Component }  from 'react';
import { connect } from 'react-redux';
import db from '../data/data';
// import { fetchUser } from '../actions';

class Project extends Component {

  render() {  

    let data = db.project;
    let ret = [];
    let cur;
    let list = [];

    data.map((item,i)=>{
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

    return (
      <div className="g-proj">
          {ret.map((item,i)=>{
              return (
              <div className="m-proj-row" key={i}>
                <div className="m-proj-y">{item.year}</div>
                {item.list.map((obj,j)=>{
                  return (
                  <div className="m-proj-item" key={j}>
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

