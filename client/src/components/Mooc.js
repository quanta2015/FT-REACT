import React, { Component }  from 'react';
import { connect } from 'react-redux';
import { fetchMoocList,fetchMoocDetail,setLoading } from '../actions';
import $ from 'jquery';
import { Spin } from 'antd'; 
import api from '../lib/api';

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
    this.setState({index:id});

    if (document.querySelector('html').clientWidth>999) {
      $('.m-mooc-chap span').hide();
    }
    
  }

  showMooc= (e) => {
    if (document.querySelector('html').clientWidth<1000) {
      $('.m-mooc-main').show();
      $('.m-mooc-bar').hide();
    };

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

  showPPT =(e)=> {
    e.stopPropagation();
    let { moocList } = this.props;
    let moocId = this.state.index;
    let moocName = moocList[moocId].mooc;
    let cid = $(e.currentTarget).data("cid");
    let lid = $(e.currentTarget).data("lid");
    let chapName = moocList[moocId].list[cid].chap;
    let itemName = moocList[moocId].list[cid].list[lid];
    let mp =  `${moocName}|${chapName}|${itemName}`;

    let win = window.open(`/ppt?parms=${mp}`, '_blank');
    win.focus();  
  }

  slideMooc=(e)=>{
    if (document.querySelector('html').clientWidth<1000) return;

    let sl = $(e.currentTarget);
    let show = sl.data('show');
    (show)?sl.data("show",false).nextAll().hide():sl.data("show",true).nextAll().show();
  }

  doReturn = (e) =>{
    $('.m-mooc-main').hide();
      $('.m-mooc-bar').show();
  }

  render() {  
    let { moocList,moocDetail,loading } = this.props;
    let { index } = this.state;
    let chapList;

    if ((typeof(moocList)==='undefined')) {
      moocList = [];
      chapList = [];
    }else{
      chapList = moocList[index].list;

      //菜单滚动
      let o = document.querySelector('.m-mooc-wrap');
      api.addScroll(o);
    }

    return (
      <div className="g-mooc">
        {loading?<div className="loading"><Spin size="large" spinning={loading}/></div>:''}
        <div className="m-mooc-menu">
          {moocList.map((item,i)=>{
            return(
              <div className={(index===i)?`m-mooc-item fn-active`:`m-mooc-item`} key={i} data-id={i} onClick={this.selectMooc}>
                <span>{item.mooc}</span>
              </div>
            )
          })}
        </div>

        <div className="m-mooc-cnt">
          <div className="m-mooc-bar">
          <div className="m-mooc-wrap">
          {chapList.map((chap,i)=>{
            return(
              <div className="m-mooc-chap"  key={i}>
                <label className="m-bar-item" data-show="false" onClick={this.slideMooc}>{chap.chap} <i>{chap.list.length}</i> </label>
                {chap.list.map((v,j)=>{
                  return(
                    <span className="m-bar-item" key={j} data-cid={i} data-lid={j} onClick={this.showMooc}>{v} <em  data-cid={i} data-lid={j} onClick={this.showPPT}>P</em> </span>
                  )
                })}
              </div>
            )
          })}
          </div>
          </div>
          <div className="m-mooc-main">
            <div className="m-mooc-close" onClick={this.doReturn}>返回</div>
            <div className="markdown-body" dangerouslySetInnerHTML = {{ __html:moocDetail }}></div>
          </div>
        </div>

        <iframe src="https://mooc1-2.chaoxing.com/course/202363749.html"  title="mooc" Style="display:none;"></iframe>

      </div>
    )
  }
}


const mapStateToProps  = (state) => ({
  moocList: state.moocList,
  moocDetail: state.moocDetail,
  loading: state.loading,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getMoocList: () => {
      dispatch( setLoading() );
      dispatch(fetchMoocList());
    },
    getMoocDetail: (mpath) => {
      dispatch( setLoading() );
      dispatch(fetchMoocDetail(mpath));
    },
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Mooc);

