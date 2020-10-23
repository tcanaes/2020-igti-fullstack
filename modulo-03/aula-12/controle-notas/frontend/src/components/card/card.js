import React, { useEffect, useState } from 'react';
import CardTitle from './cardTitle';
import CardInfo from './cardInfo';
import CardTotal from './cardTotal';
import css from './card.module.css';

export default function Card({ card }) {
  return (
    <div className={css.cardContainer}>
      <CardTitle />
      {card.grades.map((grade) => {
        return (
          <CardInfo
            key={grade.id}
            aluno={card.aluno}
            disciplina={card.disciplina}
            grade={grade}
          />
        );
      })}
      <CardTotal total={card.total} />
    </div>
  );
}
