import React from 'react';
import css from './user.module.css';

export default function User(props) {
  const { login, name, picture } = props.user;
  return (
    <li className={css.flexRow}>
      <img className={css.avatar} src={picture.large} alt={name.first} />
      <span>{name.first}</span>
    </li>
  );
}
