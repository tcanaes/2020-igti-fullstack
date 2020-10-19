import React, { Component } from 'react'
import { formatCurrency } from '../../helpers/formatHelper';
import css from './impostos.module.css';

export default class Impostos extends Component {

  render() {
    const { baseInss, inss, inssPercent, baseIrpf, irpf, irpfPercent } = this.props.taxesData;
    const inputClasses = `input-field ${css.taxes}`;
    return (
      <div className={css.impostosContainer}>
        <div className={inputClasses}>
          <input className={css.taxValue} disabled type="text" value={formatCurrency(baseInss)}></input>
          <label className="active">Base INSS:</label>
        </div>

        <div className={inputClasses}>
          <input className={`${css.taxValue} ${css.inss}`} disabled type="text" value={formatCurrency(inss, inssPercent)}></input>
          <label className="active">Desconto INSS:</label>
        </div>

        <div className={inputClasses}>
          <input className={css.taxValue} disabled type="text" value={formatCurrency(baseIrpf)}></input>
          <label className="active">Base IRPF:</label>
        </div>

        <div className={inputClasses}>
          <input className={`${css.taxValue} ${css.irpf}`} disabled type="text" value={formatCurrency(irpf, irpfPercent)}></input>
          <label className="active">Desconto IRPF:</label>
        </div>
      </div>
    )
  }
}
