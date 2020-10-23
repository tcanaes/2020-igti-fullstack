import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Spinner from './components/Spinner';
import Candidates from './components/Candidates';

export default function App() {
  const [candidates, setCandidates] = useState([]);
  const [previousVotes, setPreviousVotes] = useState([]);
  const [previousPercentages, setPpreviousPercentages] = useState([]);

  useEffect(() => {
    setInterval(() => {
      (async () => {
        const res = await fetch('http://localhost:8080/votes');
        const json = await res.json();
        if (candidates) {
          const previousVotes = candidates.map(({ id, votes }) => {
            return { id, votes };
          });
          setPreviousVotes(previousVotes);

          const previousPercentages = candidates.map(({ id, percentage }) => {
            return { id, percentage };
          });
          setPpreviousPercentages(previousPercentages);
        }
        setCandidates(json.candidates);
      })();
    }, 1000);
  }, []);

  if (candidates.length === 0) {
    return <Spinner description="Carregando..." />;
  }

  return (
    <div className="container">
      <Header>Votação</Header>
      <Candidates
        previousPercentages={previousPercentages}
        previousVotes={previousVotes}
        candidates={candidates}
      />
    </div>
  );
}
