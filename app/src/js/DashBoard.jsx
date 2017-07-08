import React from 'react';
import Settings from './DashBoard/Settings.jsx';
import CurrentSong from './DashBoard/CurrentSong.jsx';
import {fetchJson} from './Helper';


import "../css/DashBoard.scss";

export default class DashBoard extends React.Component {
  constructor(props){
    super(props)
    this.logout = this.logout.bind(this);
    this.state = { displayName: "", logo: "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="};
  }

  componentDidMount(){
    fetchJson("/api/profile", { credentials: 'same-origin' })
      .then((res) => {
        if (!res.ErrorOccured) {
          this.setState({
            displayName: res.User.displayName,
            logo: res.User.logo
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
        <div id="container">
          <Settings/>
          <CurrentSong/>
        </div>
      </div>
    )
  }
}
