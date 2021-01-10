const Usuario = require('../models/usuario');
const usuarioConectado = async (uid) => {
  try {
    const usuario = await Usuario.findById(uid);
    usuario.online = true;
    await usuario.save();
    return usuario;
  } catch (error) {
    console.log('Error en usuarioConectado', error);
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
  }
};

const getUsuarios = async () => {
  try {
    const usuarios = await Usuario.find().sort('-online');
    return usuarios;
  } catch (error) {
    console.log('Error en getUsuarios', error);
  }
};

module.exports = {
  usuarioConectado,
  usuarioDesconectado,
  getUsuarios,
};
