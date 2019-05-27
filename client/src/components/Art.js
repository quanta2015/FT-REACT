import React, { Component }  from 'react';
import { connect } from 'react-redux';
import { fetchNoteDetail,setLoading } from '../actions';
import $ from 'jquery';

class Art extends Component {

  componentDidMount = () =>{
    var id = this.props.match.params.id.split('|')[0];
    var name = this.props.match.params.id.split('|')[1];
    this.props.getNoteDetail(id,name);
    $('.m-nav').hide();
  }

  render() {  
    const { noteDetail } = this.props;

    return (
      <div className="g-art">
        <div className="markdown-body" dangerouslySetInnerHTML = {{ __html:noteDetail }}></div>
     </div>
    )    
  }
}

const mapStateToProps  = (state) => ({
  loading: state.loading,
  noteDetail: state.noteDetail,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getNoteDetail: (id,name) => {
      dispatch( setLoading() );
      dispatch(fetchNoteDetail(id,name));
    },
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Art);
