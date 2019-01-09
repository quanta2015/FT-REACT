import React, { Component }  from 'react';
import { connect } from 'react-redux';
import { fetchPPT,setLoading } from '../actions';
import { Spin } from 'antd'; 
import $ from 'jquery';
import conf from '../config';

class Project extends Component {


  componentDidMount = () =>{
    var _id = this.props.match.params.id.replace(/\|/g,"/");
    this.props.getPPT(_id);
    $('.m-nav').hide();
  }


  render() {  
    const { pptFile } = this.props;
    let show ;
    if (typeof(pptFile) === 'undefined') {
      show = false;
    }else{
      show = true;
    }

    let url = `${conf.host}ppt?id=${pptFile}`

    return (
      <div className="g-ppt">
        {show?<iframe src={url} frameBorder="0" title="ppt"></iframe>:''}
     </div>
    )    
  }
}

const mapStateToProps  = (state) => ({
  projectList: state.projectList,
  projectDetail: state.projectDetail,
  loading: state.loading,
  pptFile: state.pptFile,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getPPT: (id) => {
      dispatch( setLoading() );
      dispatch(fetchPPT(id));
    },
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Project);
