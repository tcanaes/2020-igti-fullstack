import React from 'react';
import css from './rate.module.css';
import Stars from './Stars/Stars.js';

export default function Rate({ rate }) {
  return (
    <div className={`${css.rateContainer}`}>
      <Stars rate={rate} />
    </div>
  );
}
