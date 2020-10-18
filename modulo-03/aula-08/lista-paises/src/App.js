import React, { Component } from 'react';
import Header from './components/header/Header';
import Countries from './components/countries/Countries';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      allCountries: [],
      filteredCountries: [],
    }
  }

  async componentDidMount() {
    const apiUrl = 'https://restcountries.eu/rest/v2/all';
    const response = await fetch(apiUrl);
    const results = await response.json();
    const allCountries = results.map(el => {
      return { 
        id: el.numericCode,
        name: el.name,
        flag: el.flag,        
        population: el.population
      };
    });
    this.setState({allCountries});
    this.setState({filteredCountries: allCountries});
  }

  handleCountrySearch = (filteredCountries) => {
    this.setState({filteredCountries});
  }

  render() {
    const { allCountries, filteredCountries } = this.state;
    return (
      <div className="container">
        <Header allCountries={allCountries} onSearch={this.handleCountrySearch}/>
        <hr />
        <h4>Países</h4>
        <Countries countriesList={filteredCountries}/>
      </div>
    );
  }
}
