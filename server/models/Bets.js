const { Schema } = require("mongoose");

const betSchema = new Schema({
    team: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 5,
        max: 100
    },
    spread: {
        type: Number,
        required: true
    },
    betId: {
        type: String, // check if this should be an ID
        required: true
    }
});

module.exports = betSchema;