import React, { Component } from 'react';
import ProjetoBase from './components/ProjetoBase/ProjetoBase';
import { getTimestamp } from './helpers/timestampHelper';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      clickArray: [],
    };
  }

  handleClick = () => {
    const newClickArray = Object.assign([], this.state.clickArray);
    newClickArray.push(getTimestamp());
    this.setState({ clickArray: newClickArray });
  };
  clearList = () => {
    const newClickArray = Object.assign([], this.state.clickArray);
    newClickArray.splice(0, newClickArray.length);
    this.setState({ clickArray: newClickArray });
  };

  componentDidUpdate() {
    document.title = this.state.clickArray.length.toString();
  }

  render() {
    const { clickArray } = this.state;
    return (
      <div>
        <h1>
          React e <em>Class Components</em>
        </h1>
        <button onClick={this.handleClick}>Add Timestamp</button>
        <button onClick={this.clearList}>Clear</button>
        <ul>
          {clickArray.map((item) => {
            return <li key={item}>{item}</li>;
          })}
        </ul>
      </div>
    );
  }
}
