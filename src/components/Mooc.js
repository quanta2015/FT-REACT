import React, { Component }  from 'react';
import { connect } from 'react-redux';
import { fetchMoocList } from '../actions';
import $ from 'jquery';

class Mooc extends Component {

  constructor(props) {
    super(props);
    this.state = {
      index:0
    };
  }

  componentDidMount = () =>{
    this.props.getMoocList();
  }

  selectMooc = (e) => {
    let id = $(e.currentTarget).data("id");
    this.setState({index:id})
    console.log();
  }

  render() {  
    let { moocList } = this.props;
    let { index } = this.state;
    let chapList;

    if ((typeof(moocList)==='undefined')) {
      moocList = [];
      chapList = [];
    }else{
      chapList = moocList[index].list;
    }

    return (
      <div className="g-mooc">
        <div className="m-mooc-menu">
          {moocList.map((item,i)=>{
            return(
              <div className="m-mooc-item" key={i} data-id={i} onClick={this.selectMooc}>
                <span>{item.mooc}</span>
              </div>
            )
          })}
        </div>

        <div className="m-mooc-cnt">
          <div className="m-mooc-bar">
          {chapList.map((chap,i)=>{
            return(
              <div className="m-mooc-chap"  key={i}>
                <label className="m-bar-item">{chap.chap}</label>
                {chap.list.map((v,j)=>{
                  return(
                    <span className="m-bar-item" key={j}>{v}</span>
                  )
                })}
              </div>
            )
          })}
          </div>
          <div className="m-mooc-main">
            aaa
          </div>
          
        </div>

      </div>
    )
  }
}


const mapStateToProps  = (state) => ({
  moocList: state.moocList,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getMoocList: () => {
      dispatch(fetchMoocList());
    },
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Mooc);

