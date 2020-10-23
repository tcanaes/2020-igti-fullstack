import React, { useEffect, useState } from 'react';

export default function CardInfo({ aluno, disciplina, grade }) {
  return (
    <div className="row">
      <div className="col s3">{aluno}</div>
      <div className="col s3">{disciplina}</div>
      <div className="col s3">{grade.type}</div>
      <div className="col s1">{grade.value}</div>
      <div className="col s1">
        <i className="smal material-icons">create</i>
      </div>
      <div className="col s1">
        <i className="smal material-icons">delete</i>
      </div>
    </div>
  );
}
