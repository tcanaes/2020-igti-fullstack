import React, { Component } from 'react';

class DecrementButton extends Component {
  handleButtonClick = () => {
    this.props.onDecrement('-');
  };
  render() {
    return (
      <button
        onClick={this.handleButtonClick}
        className="waves-effect waves-light btn red darken-4"
      >
        -
      </button>
    );
  }
}

export default DecrementButton;
