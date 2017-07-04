import React from 'react';
import ReactDOM from 'react-dom';
import {fetchJson, sleep} from './Helper';

export class LoginTwitch extends React.Component{
  openPopup(){
    var newWindow = window.open('/auth/twitch','name','height=600,width=450');
    if (window.focus) {
      newWindow.focus();
    }
  }

  render(){
    return(
      <button onClick={this.openPopup} className="twitch">Connect with Twitch</button>
    )
  }
}

export class LogoutTwitch extends React.Component{
  constructor(props){
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout(){
    this.props.onLogout();
  }

  render(){
    return(
      <button onClick={this.logout}>Logout</button>
    )
  }
}
