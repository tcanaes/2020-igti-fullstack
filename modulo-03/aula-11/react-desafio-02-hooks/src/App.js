import React, { useEffect, useState } from 'react';
import Countries from './components/countries/Countries';
import Header from './components/header/Header';

export default function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [filteredPopulation, setFilteredPopulation] = useState(0);
  const [filter, setFilter] = useState('');

  const calculateTotalPopulationFrom = (countries) => {
    const totalPopulation = countries.reduce((accumulator, current) => {
      return accumulator + current.population;
    }, 0);

    return totalPopulation;
  };

  useEffect(() => {
    (async () => {
      const res = await fetch('https://restcountries.eu/rest/v2/all');
      const json = await res.json();

      const countriesList = json.map(
        ({ name, numericCode, flag, population }) => {
          return {
            id: numericCode,
            name,
            filterName: name.toLowerCase(),
            flag,
            population,
          };
        }
      );

      const filteredPop = calculateTotalPopulationFrom(countriesList);
      const filtCountries = Object.assign([], countriesList);

      setAllCountries(countriesList);
      setFilteredCountries(filtCountries);
      setFilteredPopulation(filteredPop);
    })();
  }, []);

  const handleChangeFilter = (newText) => {
    setFilter(newText);

    const filterLowerCase = newText.toLowerCase();

    const filtCountries = allCountries.filter((country) => {
      return country.filterName.includes(filterLowerCase);
    });

    const filteredPop = calculateTotalPopulationFrom(filtCountries);
    setFilteredCountries(filtCountries);
    setFilteredPopulation(filteredPop);
  };

  return (
    <div className="container">
      <h1 style={styles.centeredTitle}>React Countries</h1>

      <Header
        filter={filter}
        countryCount={filteredCountries.length}
        totalPopulation={filteredPopulation}
        onChangeFilter={handleChangeFilter}
      />

      <Countries countries={filteredCountries} />
    </div>
  );
}

const styles = {
  centeredTitle: {
    textAlign: 'center',
  },
};
