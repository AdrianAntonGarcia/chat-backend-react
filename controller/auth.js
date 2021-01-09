const { response } = require('express');
const Usuario = require('../models/usuario');
/**
 * crearUsuario: Realiza el registro del usuario.
 * @param {*} req
 * @param {*} res
 */
const crearUsuario = async (req, res = response) => {
  try {
    const { email, password } = req.body;
    /**
     * Verificar que el email no exista
     */
    const existeEmail = await Usuario.findOne({ email: email });
    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: 'El correo ya existe',
      });
    }
    // TODO: Encriptar contraseña

    // Guardar usuario en BD
    const usuario = new Usuario(req.body);
    await usuario.save();
    res.json({
      usuario,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    });
  }
};

/**
 * login: Realiza el login del usuario
 * @param {*} req
 * @param {*} res
 */
const login = async (req, res = response) => {
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
