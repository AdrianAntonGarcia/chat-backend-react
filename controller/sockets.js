const Usuario = require('../models/usuario');
const Mensaje = require('../models/mensaje');

const usuarioConectado = async (uid) => {
  try {
    const usuario = await Usuario.findById(uid);
    usuario.online = true;
    await usuario.save();
    return usuario;
  } catch (error) {
    console.log('Error en usuarioConectado', error);
    return false;
  }
};

const usuarioDesconectado = async (uid) => {
  try {
    const usuario = await Usuario.findById(uid);
    usuario.online = false;
    await usuario.save();
    return usuario;
  } catch (error) {
    console.log('Error en usuarioConectado', error);
    return false;
  }
};

const getUsuarios = async () => {
  try {
    const usuarios = await Usuario.find().sort('-online');
    return usuarios;
  } catch (error) {
    console.log('Error en getUsuarios', error);
    return false;
  }
};

const grabarMensaje = async (payload) => {
  try {
    const mensaje = new Mensaje(payload);
    await mensaje.save();
    return mensaje;
  } catch (error) {
    console.log('Error en grabarMensaje', error);
    return false;
  }
};

module.exports = {
  usuarioConectado,
  usuarioDesconectado,
  getUsuarios,
  grabarMensaje,
};
