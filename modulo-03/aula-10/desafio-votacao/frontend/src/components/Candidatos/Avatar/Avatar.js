import React from 'react';
import css from './avatar.module.css';

export default function Avatar({ imgId }) {
  return (
    <div className={`${css.imgColumn}`}>
      <div className={css.imgContainer}>
        <img className={css.imgFile} src={`./img/${imgId}.jpg`} />
      </div>
    </div>
  );
}
