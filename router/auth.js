const { Router } = require('express');
const { crearUsuario, login, renewToken } = require('../controller/auth');
/**
 * path: api/login
 */
const router = Router();

/**
 * Crear nuevos usuarios
 */
router.post('/new', crearUsuario);

/**
 * Realizar el login
 */
router.post('/', login);

module.exports = router;

/**
 * Revalidar token
 */
router.get('/renew', renewToken);
