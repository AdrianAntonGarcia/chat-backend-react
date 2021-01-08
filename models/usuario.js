const { Schema, model } = require('moongose');

const UsuarioSchema = Schema({
  nombre: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  online: {
    type: Boolean,
    default: false,
  },
});

/**
 * Estamos sobrescribiendo la función toJSON del usuarioSchema.
 * No podemos usar una función de flecha ya que hay que usar el this.
 */
UsuarioSchema.method('toJSON', function () {
  // Estamos quitando estas tres propiedades del object
  const { __v, _id, password, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

/**
 * Por defecto moongose lo pone en plural
 */
module.exports = model('Usuario', UsuarioSchema);
