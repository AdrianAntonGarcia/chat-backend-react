const { response } = require('express');
const { validationResult } = require('express-validator');

/**
 * crearUsuario: Realiza el registro del usuario.
 * @param {*} req
 * @param {*} res
 */
const crearUsuario = async (req, res = response) => {
  res.json({
    ok: true,
    msg: 'register',
  });
};

/**
 * login: Realiza el login del usuario
 * @param {*} req
 * @param {*} res
 */
const login = async (req, res = response) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errores.mapped(),
    });
  }
  const { email, password } = req.body;
  res.json({
    ok: true,
    msg: 'login',
    email,
    password,
  });
};

/**
 * renewToken: Realiza la renovación del token del usuario
 * @param {*} req
 * @param {*} res
 */
const renewToken = async (req, res) => {
  res.json({
    ok: true,
    msg: 'Renew',
  });
};

module.exports = {
  crearUsuario,
  login,
  renewToken,
};
