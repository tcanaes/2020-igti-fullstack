import Grades from '../models/GradesModel.js';

const grades = new Grades();

function getAllGrades(req, res, next) {
  let allGrades = grades.getGrades();
  allGrades.results = allGrades.grades.length;
  const status = allGrades.status === 'success' ? 200 : 400;
  res.status(status).json(allGrades);
}
function createGrade(req, res, next) {
  console.log(req.body);
  const result = grades.addGrade(req.body);
  const status = result.status === 'success' ? 200 : 400;
  res.status(status).json(result);
}
function displayGrade(req, res, next) {
  const gradesById = grades.getGrades(req.params);
  const status = gradesById.status === 'success' ? 200 : 400;
  res.status(status).json(gradesById);
}
function updateGrade(req, res, next) {
  req.body.id = req.params.id;
  const updatedGrade = grades.updateGrade(req.body);
  const status = updatedGrade.status === 'success' ? 200 : 400;
  res.status(status).json(updatedGrade);
}
function deleteGrade(req, res, next) {
  const deletedGrade = grades.deleteGrade(req.params.id);
  const status = deletedGrade.status === 'success' ? 200 : 400;
  res.status(status).json(deletedGrade);
}

function gradesAverage(req, res, next) {
  const subject = req.params.subject;
  const type = req.params.type;
  const gradesAverage = grades.gradesAverage(subject, type);
  const status = gradesAverage.status === 'success' ? 200 : 400;
  res.status(status).json(gradesAverage);
}
function topGrades(req, res, next) {
  const subject = req.params.subject;
  const type = req.params.type;
  const topGrades = grades.topGrades(subject, type);
  const status = topGrades.status === 'success' ? 200 : 400;
  res.status(status).json(topGrades);
}
function totalScore(req, res, next) {
  const subject = req.params.subject;
  const student = req.params.student;
  const totScore = grades.totalScore(subject, student);
  const status = totScore.status === 'success' ? 200 : 400;
  res.status(status).json(totScore);
}

const gradesController = {
  getAllGrades,
  createGrade,
  displayGrade,
  updateGrade,
  deleteGrade,
  gradesAverage,
  topGrades,
  totalScore,
};

export default gradesController;
