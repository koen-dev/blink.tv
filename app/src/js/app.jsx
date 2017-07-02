import React from 'react';
import ReactDOM from 'react-dom';

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


setTimeout(() => {
  ReactDOM.render(
    <App />,
    document.getElementById("app")
  );
}, 5000);
