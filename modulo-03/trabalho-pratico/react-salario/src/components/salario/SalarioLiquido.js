import React, { Component } from 'react';
import { formatCurrency } from '../../helpers/formatHelper';

export default class SalarioLiquido extends Component {
  
  render() {
    const { value } = this.props;
    return (
      <div className="input-field">
        <input style={{color: 'green', fontWeight: 'bold'}}disabled type="text" value={formatCurrency(value)}></input>
        <label className="active">Salário líquido:</label>
      </div>
    )
  }
}
