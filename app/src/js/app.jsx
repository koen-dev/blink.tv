import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import DOMinator from './DOMinator';
import {fetchJson, sleep} from './Helper';
import {LoginTwitch, LogoutTwitch} from './Twitch.jsx';

import "../css/style.scss";


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = { isLoggedIn: props.isLoggedIn };
    this.logout = this.logout.bind(this);
  }

  componentDidMount(){
    document.getElementById("app").removeClass("loader");
    window.success = () => {
      this.setState({ isLoggedIn: true });
    }
  }

  componentWillUnmount(){
    document.getElementById("app").addClass("loader");
  }

  login(){
    this.setState({ isLoggedIn: true });
  }

  logout(){
    fetchJson("/auth/logout", { credentials: 'same-origin' })
      .then((res) => {
        if (!res.ErrorOccured) {
          this.setState({ isLoggedIn: false });
        }
      });
  }

  render(){
    const isLoggedIn = this.state.isLoggedIn;
    let button = null;
    if (isLoggedIn) {
      button = <LogoutTwitch onLogout={this.logout}/>;
    } else {
      button = <LoginTwitch/>;
    }
    return(
      <div>
        {button}
      </div>
    )
  }
}

ReactDOM.render(
  <App isLoggedIn={__react_preload_data}/>,
  document.getElementById("app")
);
