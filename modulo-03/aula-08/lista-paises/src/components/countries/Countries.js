import React, { Component } from 'react';
import css from './countries.module.css';

export default class Countries extends Component {
  render() {
    const { countriesList } = this.props;
    return (
      <div className={css.resultArea}>
        { countriesList.map(el => { return(
          <div key={el.name} className={css.countryBlock}>
            <div className={css.flagContainer}><img className={css.countryFlag} src={el.flag} alt={el.name}/></div>
            <p className={css.countryName}>{el.name}</p>
          </div>
        );})}
        </div>
    )
  }
}
