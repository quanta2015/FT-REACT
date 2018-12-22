import React, { Component }  from 'react';

import reactFImg from '../img/ft-react.png';
import reduxFImg from '../img/ft-redux.png';
import ftFImg from '../img/ft-tf.png';
import xfFImg from '../img/ft-xf.png';
import mysqlFImg from '../img/ft-mysql.png';
import mdbFImg from '../img/ft-mdb.png';
import nodeImg from '../img/ft-node.png';
import socketioImg from '../img/ft-socketio.png';

class Footer extends Component {

  render() {  

    return (
      <div className="g-footer">
        <div className="m-footer">
          <div className="m-ft">
            <img src={reactFImg} alt=""/>
            <img src={reduxFImg} alt=""/>
            <img src={ftFImg} alt=""/>
            <img src={xfFImg} alt=""/>
          </div>
          <div className="m-ft">
            <img src={nodeImg} alt=""/>
            <img src={socketioImg} alt=""/>
            <img src={mysqlFImg} alt=""/>
            <img src={mdbFImg} alt=""/>
          </div>
          <div className="m-ft">
            <span>杭州师范大学国际服务工程学院 前端技术社团</span>
            <span>2018@All Rights Researved</span>
          </div>
        </div>
      </div>
    )
  }
}



export default Footer;

