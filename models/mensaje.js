const { Schema, model } = require('moongose');

const MensajeSchema = Schema(
  {
    de: {
      type: Schema.Types.ObjectId,
      ref: 'Usuario',
      required: true,
    },
    para: {
      type: Schema.Types.ObjectId,
      ref: 'Usuario',
      required: true,
    },
    mensaje: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Estamos sobrescribiendo la función toJSON del usuarioSchema.
 * No podemos usar una función de flecha ya que hay que usar el this.
 */
MensajeSchema.method('toJSON', function () {
  // Estamos quitando estas tres propiedades del object
  const { __v, ...object } = this.toObject();
  return object;
});

/**
 * Por defecto moongose lo pone en plural
 */
module.exports = model('Mensaje', MensajeSchema);
