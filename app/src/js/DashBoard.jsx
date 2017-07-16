import React from 'react';
import UserInfo from './DashBoard/UserInfo.jsx';
import Settings from './DashBoard/Settings.jsx';
import CurrentSong from './DashBoard/CurrentSong.jsx';
import Follows from './DashBoard/Follows.jsx';
import {fetchJson} from './Helper';
import TwitchAPI from './TwitchApiHelper';

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
      userId: "",
      channelData: null,
      isStreaming: false
    };
  }

  componentDidMount(){
    fetchJson("/api/profile", { credentials: 'same-origin' })
      .then((res) => {
        if (!res.ErrorOccured) {
          TwitchAPI.setToken(res.User.token);
          TwitchAPI.getChannel()
            .then((res) => {
              TwitchAPI.setUserId(res._id);
              TwitchAPI.getStream()
                .then((stream) => {
                  this.setState({
                    hasData: true,
                    displayName: res.display_name,
                    logo: res.logo,
                    userId: res._id,
                    channelData: res,
                    isStreaming: (stream.stream ? true : false)
                  });
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
          <UserInfo channel={this.state.channelData}/>
          <Follows limit="10"/>
        </div>
      )
    }
  }

  render(){
    var statusClasses = "status " + (this.state.isStreaming ? "streaming" : "");
    return(
      <div id="dashboard">
        <header>
          <div className="right-menu">
            <div className="displayname">{this.state.displayName}</div>
            <div className="icon-wrapper" onClick={this.showMenu}>
              <img className="icon" src={this.state.logo}/>
              <div className={statusClasses}></div>
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
