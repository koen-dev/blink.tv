import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import DOMinator from './DOMinator';
import {fetchJson, sleep} from './Helper';
import HomePage from './HomePage.jsx';
import DashBoard from './DashBoard.jsx';

import "../css/style.scss";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = { isLoggedIn: props.isLoggedIn };
    this.logout = this.logout.bind(this);
  }

  componentDidMount(){
    window.success = () => {
      this.setState({ isLoggedIn: true });
    }
  }

  componentWillUnmount(){
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
    if (this.state.isLoggedIn) {
      return <DashBoard onLogout={this.logout}/>;
    } else {
      return <HomePage/>;
    }
  }
}

ReactDOM.render(
  <App isLoggedIn={__react_preload_data}/>,
  document.getElementById("app")
);
