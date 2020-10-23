import React from 'react';
import css from './percent.module.css';
import { formatPercent } from '../../../../utils/formatter.js';

export default function Percent({ percent }) {
  return (
    <div className={`${css.percentContainer}`}>
      <p>{formatPercent(percent)}</p>
    </div>
  );
}
