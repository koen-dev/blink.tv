import React from 'react';
import ReactDOM from 'react-dom';
import TwitchAPI from '../TwitchApiHelper';

class FollowerAlert extends React.Component{
  constructor(props){
    super(props);
    this.updateFollower = this.updateFollower.bind(this);
    this.state = {
      lastFollower: null
    }
  }

  componentDidMount(){
    TwitchAPI.setToken(this.props.token);
    TwitchAPI.getChannel()
      .then((res) => {
        TwitchAPI.setUserId(res._id);
          TwitchAPI.getFollowers(26490481, 1)
            .then((res) => {
              var user = ((res.follows && res.follows.length > 0) ? res.follows[0].user : null);
              if(user){
                this.setState({
                  lastFollower: user
                });
              }
              setInterval(this.updateFollower, 5000);
            });
      });
  }

  updateFollower(){
    TwitchAPI.getFollowers(26490481, 1)
      .then((res) => {
        var user = ((res.follows && res.follows.length > 0) ? res.follows[0].user : null);
        if (user && this.state.lastFollower._id != user._id) {
          this.setState({
            lastFollower: user
          })
        }
      });
  }

  render(){
    if (this.state.lastFollower) {
      return <h1>{this.state.lastFollower.display_name}</h1>
    }else{
      return null;
    }
  }
}

ReactDOM.render(
  <FollowerAlert token={__react_preload_data}/>,
  document.getElementById("app")
);
