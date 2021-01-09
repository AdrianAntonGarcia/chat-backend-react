/**
 * path: ???
 */

const { Router } = require('express');

const router = Router();

/**
 * Crear nuevos usuarios
 */
router.post('/new', (req, res) => {
  res.json({
    ok: true,
    msg: 'register',
  });
});

/**
 * Realizar el login
 */
router.post('/', (req, res) => {
  res.json({
    ok: true,
    msg: 'login',
  });
});

module.exports = router;

/**
 * Revalidar token
 */
router.get('/renew', (req, res) => {
  res.json({
    ok: true,
    msg: 'Renew',
  });
});
