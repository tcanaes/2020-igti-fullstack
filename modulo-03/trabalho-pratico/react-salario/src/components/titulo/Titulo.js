import React, { Component } from 'react';
import css from './titulo.module.css';

export default class Titulo extends Component {
  render() {
    return (
      <h1 className={css.titulo}>
        React Salário
      </h1>
    )
  }
}
