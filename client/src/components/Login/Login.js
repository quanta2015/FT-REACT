import React, { Component }  from 'react'
import { connect } from 'react-redux';
import {toastIt} from '../Toastr/toastr';
import { Redirect } from 'react-router-dom'
// import store from '../../store';
import { doLogin } from '../../actions';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { user: null, isLogin:-1 }
  }

  componentWillUnmount =()=>{

    // const {user, isLogin}  = store.getState();
    // const userInfoState = localStorage.getItem('userInfoState');

    // if (userInfoState) {
    //   localStorage.removeItem('userInfoState');
    // }

    // var  data = JSON.stringify({ user:user, isLogin: isLogin })
    // localStorage.setItem('userInfoState', data);
  }


  render() {  
    const {toLoginIn, isLogin, login}=this.props;

    if ((typeof(login) !== 'undefined')&&(login !==null)) {
      if (isLogin) {
        // this.setState( { user: login.data });
        return <Redirect to='/'></Redirect>;
      }else{
        toastIt(login.msg)
      }
    }
    console.log(login)
    
    return (
      <div className="g-login">
        <div className="row">
          <input type="text" placeholder="请输入用户名 " id='usr'/>
        </div>
        <div className="row">
          <input type="password" placeholder="请输入密码 " id='pwd' />
        </div>
        <div className="row">
          <button onClick={toLoginIn.bind(this)}>登录</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps  = (state) => ({
  login: state.login,
  isLogin: state.isLogin
});

const mapStateToDispatch=(dispatch)=>{
  return {
    toLoginIn:(e)=>{
      var usr = document.getElementById('usr').value;
      var pwd = document.getElementById('pwd').value;
      dispatch(doLogin(usr,pwd));
    }
  }
}

export default connect(mapStateToProps,mapStateToDispatch)(Login);