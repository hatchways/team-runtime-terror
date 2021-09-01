const Availability = require("../models/Availability");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
console.log("in controller");

exports.updateA = asyncHandler(async (req, res, next) => {
  const filtered = Object.entries(req.body.daysOfWeek).filter(
    ([key, value]) => value === true
  );
  let daysOfWeek = [];
  filtered.forEach((entry) => {
    daysOfWeek.push(entry[0]);
  });

  const { email, startDate, endDate, rate } = req.body;

  await Availability.updateOne(
    { email },
    {
      email,
      startDate,
      endDate,
      rate,
      daysOfWeek,
    },
    { upsert: true },
    function (err) {
      if (err) {
        res.status(500).send("Internal Server Error!");
      }
      res.status(200).send("Availability updated successfully");
    }
  );
});

exports.fetchAvailability = asyncHandler(async (req, res, next) => {
  const email_id = req.params.email;

  const availabilityData = await Availability.findOne(
    { email: email_id },
    function (err) {
      if (err) {
        res.status(404).send("Availability record not found!!");
      }
    }
  );

  if (availabilityData) {
    res.status(200).json(availabilityData);
  } else {
    res.status(404).send("something went wrong");
  }
});
