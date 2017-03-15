import React, { Component } from 'react';
import './App.css';

// }
function Greeting(props) {
  return (
    <div>
    <h1>{props.title}</h1>
    <h2>{props.message}</h2>
    <h3>{props.start_time}</h3>
      <div class="offset-sm-2 col-sm-10 text-right">
        <button type="button" onClick="location.href='/'" >一覧</button>
      </div>
    </div>
  );
}

class App extends Component {


  render() {
    return (
      <Greeting title="test" message="dasss" start_time="ok"/>
    );
  }
}

export default App;
