import express from 'express';
import * as Controller from '../controllers/transactionController.js';

const router = express.Router();

router
  .route('/conta/:agencia/:conta')
  .get(Controller.saldo)
  .delete(Controller.excluir);

router.route('/deposito').post(Controller.deposito);
router.route('/saque').post(Controller.saque);
router.route('/transferencia').post(Controller.transferencia);

router.route('/mediaSaldo/:agencia').get(Controller.mediaSaldo);

router.route('/top-pobres').get(Controller.topPobres);
router.route('/top-pobres/:qtd').get(Controller.topPobres);

router.route('/top-ricos').get(Controller.topRicos);
router.route('/top-ricos/:qtd').get(Controller.topRicos);

router.route('/agencia-vip').post(Controller.agenciaVip);

export default router;
