import React, { useEffect, useState } from 'react';

export default function CardTitle() {
  return (
    <div className="row">
      <div className="col s3">Aluno</div>
      <div className="col s3">Disciplina</div>
      <div className="col s3">Avaliação</div>
      <div className="col s1">Nota</div>
      <div className="col s2"></div>
    </div>
  );
}
