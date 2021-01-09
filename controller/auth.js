const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const usuario = require('../models/usuario');
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
    const usuario = new Usuario(req.body);
    // Encriptar contraseña, por defecto 10 vueltas en el salt
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);
    // Guardar usuario en BD
    await usuario.save();
    // Generar el JWT
    const token = await generarJWT(usuario._id);
    res.json({
      ok: true,
      usuario,
      token,
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
  try {
    const { email, password } = req.body;
    /**Verificar si existe el coreo */
    const usuarioDB = await Usuario.findOne({ email });
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: 'Email no encontrado',
      });
    }
    /**Validar el password */
    const validPassword = bcrypt.compareSync(password, usuarioDB.password);
    /**Generar el JWT */
    const token = await generarJWT(usuarioDB._id);
    if (!validPassword) {
      return res.status(404).json({
        ok: false,
        msg: 'Contraseña incorrecta',
      });
    }
    res.json({
      ok: true,
      usuarioDB,
      token,
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
 * renewToken: Realiza la renovación del token del usuario
 * @param {*} req
 * @param {*} res
 */
const renewToken = async (req, res) => {
  try {
    const uid = req.uid;
    // Generar un nuevo JWT
    const token = await generarJWT(uid);

    // Obtener el usuario por uid
    const usuario = await Usuario.findById(uid);

    res.json({
      ok: true,
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    });
  }
};

module.exports = {
  crearUsuario,
  login,
  renewToken,
};
