import React from 'react';
import css from './countries.module.css';
import Country from './Country.js';

export default function Countries({ countriesList }) {
  return (
    <div className={css.resultArea}>
      {countriesList.map((el) => {
        return <Country key={el.id} name={el.name} flag={el.flag} />;
      })}
    </div>
  );
}
