import React from 'react';
import css from './name.module.css';

export default function Name({ name }) {
  return (
    <div className={`${css.nameContainer}`}>
      <p>{name}</p>
    </div>
  );
}
