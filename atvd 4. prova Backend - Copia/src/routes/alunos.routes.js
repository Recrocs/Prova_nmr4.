const express = require('express');
const router = express.Router();
const alunosCtrl = require('../controllers/alunos.controller');

router.post('/', alunosCtrl.criarAluno);
router.get('/', alunosCtrl.listarAlunos);
router.put('/:id', alunosCtrl.atualizarAluno);
router.delete('/:id', alunosCtrl.deletarAluno);

module.exports = router;
