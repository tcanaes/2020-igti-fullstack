import React from 'react';
import Name from './Name/Name';
import Votes from './Votes/Votes';
import Percent from './Percent/Percent';
import Rate from './Rate/Rate';
import css from './status.module.css';

export default function Status({ candidate }) {
  return (
    <div className={`${css.candidateInfo}`}>
      <Name name={candidate.name} />
      <Votes votes={candidate.votes} />
      <Percent percent={candidate.percentage} />
      <Rate rate={candidate.popularity} />
    </div>
  );
}
