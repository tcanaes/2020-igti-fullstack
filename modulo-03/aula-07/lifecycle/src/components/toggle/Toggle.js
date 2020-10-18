import React, { Component } from 'react'

export default class Toggle extends Component {
  
  handleOnChange = (evt) => {
    const { onToggle } = this.props;
    onToggle(evt.target.checked);
  }
  
  render() {
    return (
      <div className="switch">
        <label>
          Mostrar usuários:
          <input type="checkbox" onChange={this.handleOnChange} />
          <span className="lever"></span>
        </label>
      </div>
    )
  }
}
