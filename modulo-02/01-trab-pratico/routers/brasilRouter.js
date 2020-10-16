const express = require('express');
const brasilController = require('../controllers/brasilController');

const router = express.Router();

router.route('/cidades/:uf').get(brasilController.getStateCities);
router.route('/cidades').get(brasilController.getAllCities);
router.route('/top-num-cities').get(brasilController.getTopStatesNumCities);
router.route('/top-num-cities/:qtd').get(brasilController.getTopStatesNumCities);
router.route('/top-city-name-size').get(brasilController.getTopCitiesNameSize);

module.exports = router;