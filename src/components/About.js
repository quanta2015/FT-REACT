import React, { Component }  from 'react';
import logo from '../img/logob.svg'

class About extends Component {

  render() {  

    return (
      <div className="g-about">
        <div className="m-me">
          <img src={logo} alt=""/>
          <div className="m-desc">
            <span><i>Leader:</i> YangLi</span>
            <span><i>Degree:</i> Post-Doctor</span>
            <span><i>Title:</i> Associate Professor</span>
            <span><i>Phone:</i> 13515814446</span>
            <span><i>Email:</i> liyangtom@163.com</span>
          </div>
        </div>
        
        <div className="u-line"></div>
        <iframe class="m-map" width='800' height='300' frameborder='0' scrolling='no' marginheight='0' marginwidth='0' title="map" src='http://f.amap.com/gUBu_0176hND'></iframe>'
      </div>
    )
  }
}

export default About;

