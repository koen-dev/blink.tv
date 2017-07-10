import React from 'react';
import Settings from './DashBoard/Settings.jsx';
import CurrentSong from './DashBoard/CurrentSong.jsx';
import Follows from './DashBoard/Follows.jsx';
import {fetchJson} from './Helper';

import "../css/DashBoard.scss";

export default class DashBoard extends React.Component {
  constructor(props){
    super(props)
    this.logout = this.logout.bind(this);
    this.state = {
      hasData: false,
      displayName: "",
      logo: "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=",
      token: "",
      followsLink: "",
      subsLink: ""
    };
  }

  componentDidMount(){
    fetchJson("/api/profile", { credentials: 'same-origin' })
      .then((res) => {
        if (!res.ErrorOccured) {
          this.setState({
            token: res.User.token
          });
          var headers = new Headers({
            "Authorization": `OAuth ${res.User.token}`
          });

          fetchJson('https://api.twitch.tv/kraken/channel', {headers: headers})
            .then((res) => {
              this.setState({
                hasData: true,
                displayName: res.display_name,
                logo: res.logo,
                followsLink: res._links.follows,
                subsLink: res._links.subscriptions
              });
            });
        }
      });

    document.addEventListener("click", (event) => {
      var target = event.target || event.srcElement;
      var userMenu = document.getElementById("user-menu");
      var iconWrapper = document.getElementsByClassName("icon-wrapper")[0];

      if (!target.is(userMenu, true) && !target.is(iconWrapper, true)) {
        userMenu.style.display = "none";
      }
    });
  }

  showMenu(){
    document.getElementById('user-menu').style.display = "block";
  }

  logout(){
    this.props.onLogout();
  }

  getWidgets(){
    if (this.state.hasData) {
      return(
        <div id="container">
          <Follows token={this.state.token} link={this.state.followsLink} limit="10"/>
          <Settings/>
        </div>
      )
    }
  }

  render(){
    return(
      <div id="dashboard">
        <header>
          <div className="right-menu">
            <div className="displayname">{this.state.displayName}</div>
            <div className="icon-wrapper" onClick={this.showMenu}>
              <img className="icon" src={this.state.logo}/>
              <div className="status"></div>
            </div>
          </div>
          <div id="user-menu">
            <ul>
              <li onClick={this.logout}>Logout</li>
            </ul>
          </div>
        </header>
        {this.getWidgets()}
      </div>
    )
  }
}
