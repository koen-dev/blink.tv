import React from 'react';
import moment from 'moment';

export default class UserInfo extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    var banner = {
      backgroundImage: `url(${this.props.channel.profile_banner})`
    };
    var icon = {
      backgroundImage: `url(${this.props.channel.logo})`
    };
    var created = moment(this.props.channel.created_at).fromNow();
    return(
      <div id="userinfo" className="widget">
        <div className="banner" style={banner}>
          <div className="icon" style={icon}></div>
        </div>
        <h1>{this.props.channel.display_name}</h1>
        <ul className="info-list">
          <li>Followers: <span>{this.props.channel.followers}</span></li>
          <li>Views: <span>{this.props.channel.views}</span></li>
          <li>Created: <span>{created}</span></li>
        </ul>
      </div>
    );
  }
}
