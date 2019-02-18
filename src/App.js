import React, { Component } from 'react';
import Header from './component/Header';
import Timeline from './component/Timeline';

class App extends Component {
  render() {
    return (
      <div id="root">
        <div className="main">
          <Header/>
          <Timeline login={this.props.login}/>
        </div>
      </div>
    );
  }
}

export default App;
