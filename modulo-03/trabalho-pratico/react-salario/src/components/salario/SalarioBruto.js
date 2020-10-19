import React, { Component } from 'react';

export default class SalarioBruto extends Component {
  handleOnChange = (element) => {
    const { setSalarioBruto } = this.props;
    setSalarioBruto(element.target.value * 1);
  }

  render() {
    return (
      <div className="input-field">
        <input id="valueInput" type="number" min="1000" placeholder="1000" onChange={this.handleOnChange}></input>
        <label className="active">Salário Bruto</label>
      </div>
    );
  }
}
