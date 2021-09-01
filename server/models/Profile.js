const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
  },
  description: {
    type: String,
  },
  address: {
    type: String,
  },
  gender: {
    type: String,
  },
  birthDate: {
    type: Date,
  },
   userType: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  filePath: {
    type: String,
    required: false,
    unique: true,
  },
  availability: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Availability",
  },
});

module.exports = Profile = mongoose.model("profile", profileSchema);
