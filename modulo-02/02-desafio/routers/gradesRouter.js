import express from 'express';
import gradesController from './../controllers/gradesController.js';

const router = express.Router();

//CRUD Operations
router
  .route('/')
  .get(gradesController.getAllGrades)
  .post(gradesController.createGrade);

router
  .route('/:id')
  .get(gradesController.displayGrade)
  .patch(gradesController.updateGrade)
  .delete(gradesController.deleteGrade);

router.get('/grades-average/:subject/:type', gradesController.gradesAverage);
router.get('/top-grades/:subject/:type', gradesController.topGrades);
router.get('/total-score/:student/:subject', gradesController.totalScore);

export default router;
