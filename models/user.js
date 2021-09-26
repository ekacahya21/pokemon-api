const { Schema, model, Types } = require('mongoose');

const { encrypt } = require('../utils/encryptionHelper');

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      set: encrypt,
    },
    catchedPokemons: [
      {
        type: Types.ObjectId,
        ref: 'Pokemon',
      },
    ],
  },
  { timestamps: true }
);

module.exports = model('User', userSchema);
