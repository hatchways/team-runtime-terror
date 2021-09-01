const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const availabilitySchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
    default: Date,
  },
  daysOfWeek: [{ type: String }],
  rate: {
    type: Number,
  },
});

module.exports = Availability = mongoose.model(
  "availability",
  availabilitySchema
);
