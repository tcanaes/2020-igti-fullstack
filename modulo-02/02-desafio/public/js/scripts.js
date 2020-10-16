const apiURI = 'http://localhost:3000/api/v1/grades';
let g_IdToUpd = '';
let g_IdToDel = '';

function alertMessage(type, message) {}

/******************************************************************************/
/*                       LOAD AND DISPLAY ENTIRE LIST                         */
/******************************************************************************/
async function loadGradesList() {
  const gradesTableElement = document.getElementById('grades-table');
  const response = await axios({ method: 'GET', url: apiURI });
  if (!response) return;
  const gradesList = await response.data.grades;
  let markup = `
    <tr>
      <th class="centered">ID</th>
      <th class="centered">Aluno</th>
      <th class="centered">Matéria</th>
      <th class="centered">Tipo</th>
      <th class="centered">Nota</th>
      <th class="centered">Incluso em</th>
    </tr>  
  `;
  gradesList.forEach((grade) => {
    markup += `
      <tr>
        <td class="centered">${grade.id}</td>
        <td>${grade.student}</td>
        <td>${grade.subject}</td>
        <td>${grade.type}</td>
        <td class="centered">${grade.value}</td>
        <td>${grade.timestamp}</td>
      </tr>
    `;
  });
  gradesTableElement.innerHTML = markup;
}

/******************************************************************************/
/*                             CREATE NEW GRADE                               */
/******************************************************************************/
async function handleNewGrade(evt) {
  evt.preventDefault();
  //Get inputed values
  const student = document.getElementById('input--new-student').value;
  const subject = document.getElementById('input--new-subject').value;
  const type = document.getElementById('input--new-type').value;
  const value = document.getElementById('input--new-value').value;
  //Clear screen fields
  document.getElementById('input--new-student').value = '';
  document.getElementById('input--new-subject').value = '';
  document.getElementById('input--new-type').value = '';
  document.getElementById('input--new-value').value = '';
  //All values are required
  if (
    student.trim() === '' ||
    subject.trim() === '' ||
    type.trim() === '' ||
    value.trim() === ''
  ) {
    alertMessage('error', 'Dados inválidos.');
    return;
  }
  //Call API to create new grade
  const response = await axios({
    method: 'POST',
    url: apiURI,
    data: {
      student,
      subject,
      type,
      value,
    },
  });
  //SUCCESS!!!!!
  if (response.status === 'success') {
    alertMessage('success', 'Dados adicionados com sucesso.');
    loadGradesList();
    return;
  }
  //Something went wrong :(
  alertMessage('error', 'Dados inválidos.');
}

/******************************************************************************/
/*                             SEARCH GRADE BY ID                             */
/******************************************************************************/
async function handleSearchId(evt, operacao) {
  evt.preventDefault();

  //Clear screen fields
  document.getElementById(`input--${operacao}-student`).value = ``;
  document.getElementById(`input--${operacao}-subject`).value = ``;
  document.getElementById(`input--${operacao}-type`).value = ``;
  document.getElementById(`input--${operacao}-value`).value = ``;
  if (operacao === 'update') g_IdToUpd = ``;
  if (operacao === 'delete') g_IdToDel = ``;

  //Get informed ID
  const id = evt.target[0].value;
  if (id.trim() === '') return;

  //Get ID grade
  let response;
  try {
    response = await axios({ method: `GET`, url: `${apiURI}/${id}` });
  } catch (err) {
    alertMessage(`error`, `Dados inválidos.`);
    return;
  }

  const grade = response.data.grade;
  document.getElementById(`input--${operacao}-student`).value = grade.student;
  document.getElementById(`input--${operacao}-subject`).value = grade.subject;
  document.getElementById(`input--${operacao}-type`).value = grade.type;
  document.getElementById(`input--${operacao}-value`).value = grade.value;
  if (operacao === 'update') g_IdToUpd = id;
  if (operacao === 'delete') g_IdToDel = id;
}

/******************************************************************************/
/*                             UPDATE GRADE BY ID                             */
/******************************************************************************/
async function handleUpdGrade(evt) {
  evt.preventDefault();
  if (g_IdToUpd === '') return;

  //Get informed grade fields
  const student = document.getElementById('input--update-student').value;
  const subject = document.getElementById('input--update-subject').value;
  const type = document.getElementById('input--update-type').value;
  const value = document.getElementById('input--update-value').value;

  //Tries to update
  let response;
  response = axios({
    method: 'PATCH',
    url: `${apiURI}/${g_IdToUpd}`,
    data: {
      student,
      subject,
      type,
      value,
    },
  })
    .then(() => {
      alertMessage('success', 'Registro alterado com sucesso.');
    })
    .catch(() => {
      alertMessage('error', 'Ocorreu algum erro inesperado.');
    });

  //Clear screen and control fields
  document.getElementById('input--update-student').value = '';
  document.getElementById('input--update-subject').value = '';
  document.getElementById('input--update-type').value = '';
  document.getElementById('input--update-value').value = '';
  document.getElementById('input--update-id').value = '';
  g_IdToUpd = '';
}

/******************************************************************************/
/*                             DELETE GRADE BY ID                             */
/******************************************************************************/
async function handleDelGrade(evt) {
  evt.preventDefault();
  if (g_IdToDel === '') return;

  //Tries to delete
  let response = axios({
    method: 'DELETE',
    url: `${apiURI}/${g_IdToDel}`,
  })
    .then(() => {
      alertMessage('success', 'Registro excluído com sucesso.');
    })
    .catch(() => {
      alertMessage('error', 'Ocorreu algum erro inesperado.');
    });

  //Clear screen and control fields
  document.getElementById('input--delete-student').value = '';
  document.getElementById('input--delete-subject').value = '';
  document.getElementById('input--delete-type').value = '';
  document.getElementById('input--delete-value').value = '';
  document.getElementById('input--delete-id').value = '';
  g_IdToDel = '';
}

/******************************************************************************/
/*                      TOTAL STUDENT SCORE BY SUBJECT                        */
/******************************************************************************/
async function handleTotGrade(evt) {
  evt.preventDefault();
  document.getElementById('input--tot-grade-value').value = '';
  const student = document
    .getElementById('input--tot-grade-student')
    .value.trim();
  const subject = document
    .getElementById('input--tot-grade-subject')
    .value.trim();

  if (student === '' || subject === '') return;
  let response;
  try {
    response = await axios(`${apiURI}/total-score/${student}/${subject}`);
  } catch (err) {}
  if (response)
    document.getElementById('input--tot-grade-value').value =
      response.data.totalGrade;
}

/******************************************************************************/
/*                    AVERAGE GRADE BY SUBJECT AND TYPE                       */
/******************************************************************************/
async function handleAverageGrade(evt) {
  evt.preventDefault();
  document.getElementById('input--average-grade-value').value = '';
  const subject = document
    .getElementById('input--average-grade-subject')
    .value.trim();
  const type = document
    .getElementById('input--average-grade-type')
    .value.trim();

  if (type === '' || subject === '') return;
  let response;
  try {
    response = await axios(`${apiURI}/grades-average/${subject}/${type}`);
  } catch (err) {}
  if (response)
    document.getElementById('input--average-grade-value').value =
      response.data.scoreAverage;
}

/******************************************************************************/
/*                    TOP 3 GRADES BY SUBJECT AND TYPE                        */
/******************************************************************************/
async function handleTopGrades(evt) {
  evt.preventDefault();
  document.getElementById('top3-grades-list').innerHTML = '';
  const subject = document
    .getElementById('input--top-grade-subject')
    .value.trim();
  const type = document.getElementById('input--top-grade-type').value.trim();
  if (type === '' || subject === '') return;
  try {
    response = await axios(`${apiURI}/top-grades/${subject}/${type}`);
  } catch (err) {}

  const gradesTableElement = document.getElementById('top3-grades-list');
  const gradesList = await response.data.grades;
  let markup = `
    <tr>
      <th class="centered">ID</th>
      <th class="centered">Aluno</th>
      <th class="centered">Matéria</th>
      <th class="centered">Tipo</th>
      <th class="centered">Nota</th>
      <th class="centered">Incluso em</th>
    </tr>  
  `;
  gradesList.forEach((grade) => {
    markup += `
      <tr>
        <td class="centered">${grade.id}</td>
        <td>${grade.student}</td>
        <td>${grade.subject}</td>
        <td>${grade.type}</td>
        <td class="centered">${grade.value}</td>
        <td>${grade.timestamp}</td>
      </tr>
    `;
  });
  gradesTableElement.innerHTML = markup;
}

/******************************************************************************/
/*                             EVENT LISTENERS                                */
/******************************************************************************/
window.addEventListener('load', () => {
  loadGradesList();

  const newGradeForm = document.getElementById('form--new-grade');
  newGradeForm.addEventListener('submit', handleNewGrade);

  const updGradeFormId = document.getElementById('form--update-id');
  updGradeFormId.addEventListener('submit', (evt) => {
    handleSearchId(evt, 'update');
  });

  const updGradeForm = document.getElementById('form--update-grade');
  updGradeForm.addEventListener('submit', handleUpdGrade);

  const delGradeFormId = document.getElementById('form--delete-id');
  delGradeFormId.addEventListener('submit', (evt) => {
    handleSearchId(evt, 'delete');
  });

  const delGradeForm = document.getElementById('form--delete-grade');
  delGradeForm.addEventListener('submit', handleDelGrade);

  const formTotGrade = document.getElementById('form--tot-grade');
  formTotGrade.addEventListener('submit', handleTotGrade);

  const formAverageGrade = document.getElementById('form--average-grade');
  formAverageGrade.addEventListener('submit', handleAverageGrade);

  const formTopGrades = document.getElementById('form--top-grade');
  formTopGrades.addEventListener('submit', handleTopGrades);
});
