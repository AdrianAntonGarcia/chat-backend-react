const { comprobarJWT } = require('../helpers/jwt');
const {
  usuarioConectado,
  usuarioDesconectado,
} = require('../controller/sockets');
class Sockets {
  constructor(io) {
    this.io = io;

    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on('connection', async (socket) => {
      const [valido, uid] = comprobarJWT(socket.handshake.query['x-token']);
      if (!valido) {
        console.log('Socket no identificado');
        return socket.disconnect();
      }
      const usuario = await usuarioConectado(uid);
      console.log(usuario);
      // TODO: Validar el JWT
      // Si el token no es válido, desconectar
      // TODO: Saber que usuario está activo mediante el UID
      // TODO: Emitir todos los usuarios conectados
      // TODO: Socket join, uid
      // TODO: Escuchar cuándo el cliente manda un mensaje, mensaje-personal
      // TODO: Manejar el disconnect, marcar en la base de datos que se desconecto
      // TODO: Emitir todos los usuarios conectados
      socket.on('disconnect', async () => {
        await usuarioDesconectado(uid);
      });
    });
  }
}

module.exports = Sockets;
