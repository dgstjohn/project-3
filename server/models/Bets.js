const { Schema } = require("mongoose");

const betSchema = new Schema({
  team: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 5,
  },
  spread: {
    type: Number,
    required: true,
  },
  betId: {
    type: String,
    required: true,
  },
});

module.exports = betSchema;
