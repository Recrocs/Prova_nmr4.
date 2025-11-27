const express = require('express');
const router = express.Router();
const inscricoesCtrl = require('../controllers/inscricoes.controller');

router.post('/', inscricoesCtrl.criarInscricao);
router.get('/', inscricoesCtrl.listarInscricoes);
router.put('/:id', inscricoesCtrl.atualizarInscricao);
router.delete('/:id', inscricoesCtrl.deletarInscricao);
router.get('/oficinas', inscricoesCtrl.TotalPorOficina);
router.get('/categorias', inscricoesCtrl.TotalPorCategoria);

module.exports = router;
