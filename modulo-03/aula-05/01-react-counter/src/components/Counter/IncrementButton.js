import React, { Component } from 'react';

class IncrementButton extends Component {
  handleButtonClick = () => {
    this.props.onIncrement('+');
  };
  render() {
    return (
      <button
        onClick={this.handleButtonClick}
        className="waves-effect waves-light btn green darken-4"
      >
        +
      </button>
    );
  }
}

export default IncrementButton;
