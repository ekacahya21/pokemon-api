const { Schema, model, Types } = require('mongoose');

const pokemonSchema = new Schema(
  {
    nickname: {
      type: String,
      required: true,
      unique: true,
    },
    refId: {
      type: String,
      required: true,
    },
    catchedBy: {
      type: Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

module.exports = model('Pokemon', pokemonSchema);
