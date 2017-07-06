import React from 'react';
import ReactDOM from 'react-dom';
import {LogoutTwitch} from './Twitch.jsx';

export default class DashBoard extends React.Component {
  constructor(props){
    super(props)
    this.logout = this.logout.bind(this);
  }

  logout(){
    this.props.onLogout();
  }

  render(){
    return(
      <h1>DashBoard <LogoutTwitch onLogout={this.logout}/></h1>
    )
  }
}
