const { Schema, model } = require("mongoose");

const teamSchema = new Schema(
    {
      homeTeam: {
        type: String,
        required: true,
        unique: true,
      },
      awayTeam: {
        type: String,
        required: true,
        unique: true,
      },
    },
    {
      toJSON: {
        virtuals: true,
      },
    }
  );

const Team = model("Team", teamSchema);

module.exports = Team;