const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, login, renewToken } = require('../controller/auth');
const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');
/**
 * path: api/login
 */
const router = Router();

/**
 * Crear nuevos usuarios
 */
router.post(
  '/new',
  [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  crearUsuario
);

/**
 * nombre: string, password: string, email: isEmail
 */
/**
 * Realizar el login
 */
router.post(
  '/',
  [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  login
);

/**
 * Revalidar token
 */
router.get('/renew', validarJWT, renewToken);

module.exports = router;
