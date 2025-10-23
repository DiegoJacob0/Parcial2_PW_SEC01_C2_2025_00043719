const express = require('express');
const router = express.Router();
const { getAllCuentas, getCuentaById, searchCuentas, getCuentasBalance } = require('../controllers/controller');


// EndPoints
router.get('/cuentas', getAllCuentas);
router.get('/cuenta/:id', getCuentaById);
router.get('/cuentas/search', searchCuentas);
router.get('/cuentas/cuentasBalance', getCuentasBalance);

module.exports = router;
