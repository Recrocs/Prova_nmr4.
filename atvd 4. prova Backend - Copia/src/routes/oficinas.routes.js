const express = require('express');
const router = express.Router();
const oficinasCtrl = require('../controllers/oficinas.controller');

router.post('/', oficinasCtrl.criarOficina);
router.get('/', oficinasCtrl.listarOficinas);
router.put('/:id', oficinasCtrl.atualizarOficina);
router.delete('/:id', oficinasCtrl.deletarOficina);

module.exports = router;
