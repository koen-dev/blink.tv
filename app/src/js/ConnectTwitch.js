import React from 'react';
import ReactDOM from 'react-dom';

export default class ConnectTwitch extends React.Component{
  openPopup(){
    var newWindow = window.open('http://localhost:3000/auth/twitch','name','height=600,width=450');
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
