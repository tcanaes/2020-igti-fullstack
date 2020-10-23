import React from 'react';
import { formatNumber } from '../../helpers/formatHelpers.js';
import css from './header.module.css';

export default function Header({
  allCountries,
  onSearch,
  qtdCountries,
  totalPopulation,
}) {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const searchString = evt.target[0].value;
    const selectedCountries = allCountries.filter((country) => {
      return country.name.toLowerCase().includes(searchString.toLowerCase());
    });
    onSearch(selectedCountries);
  };

  return (
    <div className={css.flexRow}>
      <form className={css.query} onSubmit={handleSubmit}>
        <input
          className={css.queryField}
          type="search"
          placeholder="Informe o nome do país..."
        />
        <input className={css.queryButton} type="submit" value="?" />
      </form>
      <p className={css.countryCount}>
        Quantidade de países: <strong>{qtdCountries}</strong>
      </p>
      <p className={css.populationTotal}>
        População total: <strong>{formatNumber(totalPopulation)}</strong>
      </p>
    </div>
  );
}
