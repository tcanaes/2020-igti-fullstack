import React, { Component } from 'react';
import { formatNumber } from '../../helpers/formatHelpers.js'
import css from './header.module.css';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      qtdCountries: 0,
      totalPopulation: 0,
    }
  }

  componentDidMount() {
    console.log(this.props);
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    const {allCountries, onSearch} = this.props;
    const searchString = evt.target[0].value;
    const selectedCountries = allCountries.filter(country => {
      return country.name.toLowerCase().includes(searchString.toLowerCase());
    })
    
    const qtdCountries = selectedCountries.length;
    this.setState({qtdCountries});
    
    const totalPopulation = selectedCountries.reduce((pop, country)=>{ return pop + country.population}, 0);
    this.setState({totalPopulation});

    onSearch(selectedCountries);
  }
  
  render() {
    const {qtdCountries, totalPopulation} = this.state;
    return (
      <div className={css.flexRow}>
        <form className={css.query} onSubmit={this.handleSubmit} >
          <input className={css.queryField}  type="search" placeholder="Informe o nome do país..." />
          <input className={css.queryButton} type="submit" value="?" />
        </form>
        <p className={css.countryCount}>Quantidade de países: <strong>{qtdCountries}</strong></p>
        <p className={css.populationTotal}>População total: <strong>{formatNumber(totalPopulation)}</strong></p>        
      </div>
    )
  }
}
