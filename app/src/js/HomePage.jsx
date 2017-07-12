import React from 'react';
import ReactDOM from 'react-dom';
import {LoginTwitch} from './Twitch.jsx';

import "../css/HomePage.scss";

export default class HomePage extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div id="homepage">
        <header>
          <div className="logo-wrapper">
            <div className="logo"></div>
          </div>
          <ul className="menu">
            <li><LoginTwitch/></li>
          </ul>
        </header>
        <Spinner imageProvider="https://unsplash.it/1920/350"/>
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
    }, 5000);*/
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
