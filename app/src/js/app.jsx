import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import DOMinator from './DOMinator';
import {fetchJson, sleep} from './Helper';
import ConnectTwitch from './ConnectTwitch';

import "../css/style.scss";


class App extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    document.getElementById("app").removeClass("loader");
    window.success = function(){
      location.reload();
    }
  }

  componentWillUnmount(){
    document.getElementById("app").addClass("loader");
  }

  render(){
    return(
      <ConnectTwitch />
    )
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById("app")
);
