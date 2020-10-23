import React, { Component } from 'react';
import Header from './components/header/Header';
import Countries from './components/countries/Countries';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      allCountries: [],
      filteredCountries: [],
      qtdCountries: 0,
      totalPopulation: 0,
    };
  }

  async componentDidMount() {
    const apiUrl = 'https://restcountries.eu/rest/v2/all';
    const response = await fetch(apiUrl);
    const results = await response.json();
    let popCount = 0;
    const allCountries = results.map((el) => {
      popCount += el.population;
      return {
        id: el.numericCode,
        name: el.name,
        flag: el.flag,
        population: el.population,
      };
    });
    this.setState({
      allCountries,
      filteredCountries: allCountries,
      qtdCountries: allCountries.length,
      totalPopulation: popCount,
    });
  }

  handleCountrySearch = (filteredCountries) => {
    let popCount = 0;
    filteredCountries.forEach((el) => {
      popCount += el.population;
    });
    this.setState({
      filteredCountries: filteredCountries,
      qtdCountries: filteredCountries.length,
      totalPopulation: popCount,
    });
  };

  render() {
    const {
      allCountries,
      filteredCountries,
      qtdCountries,
      totalPopulation,
    } = this.state;

    return (
      <div className="container">
        <Header
          allCountries={allCountries}
          onSearch={this.handleCountrySearch}
          qtdCountries={qtdCountries}
          totalPopulation={totalPopulation}
        />
        <hr />
        <h4>Países</h4>
        <Countries countriesList={filteredCountries} />
      </div>
    );
  }
}
