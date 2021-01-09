const { response } = require('express');

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
const login = async (req, res) => {
  res.json({
    ok: true,
    msg: 'login',
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
