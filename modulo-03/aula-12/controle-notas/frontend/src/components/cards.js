import React, { useEffect, useState } from 'react';
import Card from './card/card';

export default function Cards() {
  // const [alunos, setAlunos] = useState([]);
  // const [disciplinas, setDisciplinas] = useState([]);
  const [grades, setGrades] = useState([]);
  const [cards, setCards] = useState([]);

  const getApiGrades = async () => {
    const apiData = await fetch('http://localhost:3001/grade');
    const jsonData = await apiData.json();
    setGrades(jsonData.grades);
  };

  //Get initial data!
  useEffect(() => {
    getApiGrades();
  }, []);

  //(Re)Build the cards info when grades changes
  useEffect(() => {
    if (grades.length === 0) return;

    //get all students
    let students = [];
    let subjects = [];
    grades.forEach((grade) => {
      if (!students.includes(grade.student))
        students = [...students, grade.student];
      if (!subjects.includes(grade.subject))
        subjects = [...subjects, grade.subject];
    });

    let lCards = [];
    let cardCount = 0;
    students.forEach((student) => {
      subjects.forEach((subject) => {
        let total = 0;
        const filtGrades = grades.filter((grade) => {
          return grade.student === student && grade.subject === subject;
        });

        cardCount += 1;
        let auxCard = {
          id: `${student}-${subjects}-${cardCount}`,
          aluno: student,
          disciplina: subject,
          grades: filtGrades.map((grade) => {
            total += grade.value;
            return { id: grade.id, type: grade.type, value: grade.value };
          }),
          total,
        };

        if (filtGrades.length > 0) lCards.push(auxCard);
      });
    });
    setCards(lCards);
  }, [grades]);

  if (cards.length > 0)
    return cards.map((card) => {
      return <Card key={card.id} card={card} />;
    });
  else return <p>loading...</p>;
}
