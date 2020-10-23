import React from 'react';
import css from './posicao.module.css';

export default function Posicao({ position }) {
  return (
    <div className={`${css.positionContainer}`}>
      <p>{position}</p>
    </div>
  );
}
