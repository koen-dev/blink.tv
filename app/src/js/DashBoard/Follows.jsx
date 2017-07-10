import React from 'react';
import {fetchJson} from '../Helper';
import moment from 'moment';

export default class Follows extends React.Component{
  constructor(props){
    super(props);
    this.updateFollowers = this.updateFollowers.bind(this);
    this.state = {
      total: 0,
      follows: []
    }
  }

  componentDidMount(){
    this.updateFollowers();
    setInterval(this.updateFollowers, 5000);
  }

  updateFollowers(){
    var headers = new Headers({
      "Authorization": `OAuth ${this.props.token}`
    });
    fetchJson(`${this.props.link}?limit=${this.props.limit}`, {headers: headers})
      .then((res) => {
        this.setState({
          total: res._total,
          follows: res.follows
        })
      });
  }

  render(){
    var follows = this.state.follows;
    var listItems = follows.map((follower) =>
      <Follower key={follower.user._id} value={follower} token={this.props.token}/>
    );
    return(
      <div id="follows" className="widget">
        <div className="info">Recent follows</div>
        <ul className="userList">
          {listItems}
        </ul>
      </div>
    )
  }
}

class Follower extends React.Component{
  constructor(props){
    super(props);
    this.getUserInfo = this.getUserInfo.bind(this);
  }

  getUserInfo(){
    // TODO: Show Modal with User Info
    /*var headers = new Headers({
      "Authorization": `OAuth ${this.props.token}`
    });
    fetchJson(this.props.value.user._links.self, {headers: headers})
      .then((res) => {
        console.log(res);
      });*/
  }

  render(){
    var iconSrc = this.props.value.user.logo || "https://static-cdn.jtvnw.net/jtv_user_pictures/xarth/404_user_70x70.png";
    var date = moment(this.props.value.created_at).fromNow();
    return(
      <li onClick={this.getUserInfo}>
        <div className="icon-wrapper"><img className="icon" src={iconSrc}/></div>
        <div className="displayName">{this.props.value.user.display_name}</div>
        <div className="date">{date}</div>
      </li>
    )
  }
}
