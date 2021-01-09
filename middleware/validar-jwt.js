const { request } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req = request, res, next) => {
  try {
    const token = req.header('x-token');

    if (!token) {
      return res.status(401).json({
        ok: false,
        msg: 'No hay token en la petición',
      });
    }
    const payload = jwt.verify(token, process.env.JWT_KEY);
    // Mandamos el uid para poder usarlo en los controladores
    req.uid = payload.uid;
    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Token no es válido',
    });
  }
};

module.exports = {
  validarJWT,
};
