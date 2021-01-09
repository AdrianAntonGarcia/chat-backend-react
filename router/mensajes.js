const { Router } = require('express');
const { obtenerChat } = require('../controller/mensajes');
const { validarJWT } = require('../middleware/validar-jwt');
/**
 * Path: api/mensajes
 */
const router = Router();

router.get('/:de', validarJWT, obtenerChat);

module.exports = router;
