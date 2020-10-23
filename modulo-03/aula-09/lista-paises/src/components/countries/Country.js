import React from 'react';
import css from './countries.module.css';

export default function Country({ name, flag }) {
  return (
    <div key={name} className={css.countryBlock}>
      <div className={css.flagContainer}>
        <img className={css.countryFlag} src={flag} alt={name} />
      </div>
      <p className={css.countryName}>{name}</p>
    </div>
  );
}
