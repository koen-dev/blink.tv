import React from 'react';
import ReactDOM from 'react-dom';

import "../css/style.scss";

class App extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    // Executed after the node is inserted into the DOM
    document.getElementById("loader").style.display = "none";
  }

  render(){
    return(
      <div>
        <h1>Hello World!</h1>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById("app")
);