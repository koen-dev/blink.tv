import React from 'react';
import ReactDOM from 'react-dom';
import {LoginTwitch} from './HomePage/Twitch.jsx';

import "../css/HomePage.scss";

export default class HomePage extends React.Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
  }

  render(){
    return(
      <div id="homepage">
        <header id="header">
          <div className="info">
            Make your stream pop out in a blink of an eye.<br/>
            <LoginTwitch/>
          </div>
          <div className="features"></div>
        </header>
        <div className="main"></div>
        <footer></footer>
      </div>
    )
  }
}

export class Spinner extends React.Component {
  constructor(props){
    super(props);

    /*this.state = {
      imageProvider: this.props.imageProvider
    };*/
  }

  componentDidMount(){
    /*setInterval(() => {
      var imageUrl = `${this.props.imageProvider}?${new Date().getTime()}`;

      fetch(imageUrl)
        .then(() => {
          this.setState({imageProvider: imageUrl})
        });
    }, 60000);*/
  }

  render(){
    /*var background = {
      backgroundImage: `url(${this.state.imageProvider})`
    }*/
    return(
      <div className="spinner"></div>
    )
  }
}
