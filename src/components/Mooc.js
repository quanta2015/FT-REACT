import React, { Component }  from 'react';
import { connect } from 'react-redux';
import { fetchMoocList,fetchMoocDetail } from '../actions';
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

  showMooc= (e) => {
    let { moocList } = this.props;
    let moocId = this.state.index;
    let moocName = moocList[moocId].mooc;
    let cid = $(e.currentTarget).data("cid");
    let lid = $(e.currentTarget).data("lid");
    let chapName = moocList[moocId].list[cid].chap;
    let itemName = moocList[moocId].list[cid].list[lid];
    let mp = `${moocName}/${chapName}/${itemName}`
    this.props.getMoocDetail(mp);
  }

  render() {  
    let { moocList,moocDetail } = this.props;
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
                    <span className="m-bar-item" key={j} data-cid={i} data-lid={j} onClick={this.showMooc}>{v}</span>
                  )
                })}
              </div>
            )
          })}
          </div>
          <div className="m-mooc-main">
          <div className="m-md-body" dangerouslySetInnerHTML = {{ __html:moocDetail }}></div>
          </div>
          
        </div>

      </div>
    )
  }
}


const mapStateToProps  = (state) => ({
  moocList: state.moocList,
  moocDetail: state.moocDetail,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getMoocList: () => {
      dispatch(fetchMoocList());
    },
    getMoocDetail: (mpath) => {
      dispatch(fetchMoocDetail(mpath));
    },
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Mooc);

