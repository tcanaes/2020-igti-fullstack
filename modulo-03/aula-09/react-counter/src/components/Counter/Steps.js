import React from 'react';
import css from './counter.module.css';

export default function Steps(props) {
  return <span className={css.counterValue}>({props.value})</span>; //<div>{this.props.value}</div>;
}
