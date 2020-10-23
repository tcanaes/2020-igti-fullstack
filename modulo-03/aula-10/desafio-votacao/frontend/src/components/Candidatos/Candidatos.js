import React from 'react';
import FlipMove from 'react-flip-move';
import Posicao from './Posicao/Posicao';
import Avatar from './Avatar/Avatar';
import Status from './Status/Status';
import css from './candidatos.module.css';

export default function Candidatos({ candidates }) {
  let positionCount = 0;

  return (
    <div>
      <FlipMove>
        {candidates.map((candidate, index) => {
          return (
            <div
              key={`candidato-${candidate.id}`}
              className={`${css.candidateContainer} grey lighten-4`}
            >
              <Posicao position={index + 1} />
              <Avatar imgId={candidate.id} />
              <Status candidate={candidate} />
            </div>
          );
        })}
      </FlipMove>
    </div>
  );
}
