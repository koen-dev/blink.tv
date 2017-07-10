import React from 'react';
import {fetchJson} from '../Helper';

export default class Stats extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    var headers = new Headers({
      "Authorization": `OAuth ${this.props.token}`
    });

    var test = new Headers({
      "Client-ID": "in5r78vo79fsc3cypnfxynm9sxoveu"
    });
    fetchJson('https://api.twitch.tv/kraken/channel', {headers: headers})
      .then((res) => {
        var follows = fetchJson(res._links.follows, {headers: headers});
        var subs = fetchJson(res._links.subscriptions, {headers: headers});

        Promise.all([follows, subs])
          .then(values => {
            console.log(values);
          })
      });
  }

  render(){
    return(
      <div className="widget">
      </div>
    )
  }
}
