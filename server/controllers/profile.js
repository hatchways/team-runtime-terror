const Profile = require("../models/Profile");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const multer = require("multer");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const fs = require("fs");
const path = require("path");

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.BUCKET_REGION,
});

const s3 = new AWS.S3();
const uploadS3 = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "teamruntimeterror",
    metadata: (req, file, cb) => {
      cb(null, { fieldname: file.fieldname });
    },
    key: (req, file, cb) => {
      console.log(path.extname(file.originalname));
      cb(null, new Date().toISOString() + "-" + file.originalname);
    },
  }),
});

// @route POST /profiles
// @desc Given parameters passed in create a profile
// @access Private

exports.createProfile = asyncHandler(async (req, res, next) => {
  const { userId, userType, email } = req.body;

  const profile = await Profile.create({
    userId,
    email,
    userType,
  });

  if (profile) {
    res.status(201).send(profile._id);
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @route GET /profiles
// @desc Search for profiles with query id
// @access Private

exports.searchProfiles = asyncHandler(async (req, res, next) => {
  const profile_email = req.params.email;

  let profile;
  if (profile_email) {
    profile = await Profile.find({
      email: profile_email,
    });
  }

  if (!profile) {
    res.status(404);
    throw new Error("No profiles found in search");
  }

  const [result] = profile;
  res.status(200).json(result);
});

// @route GET /profiles
// @desc Get a list of profiles
// @access Private

exports.listAllProfiles = asyncHandler(async (req, res, next) => {
  const profiles = await Profile.find({});

  if (!profiles) {
    res.status(404);
    throw new Error("No profiles found in search");
  }

  res.status(200).json({ profiles: profiles });
});

// @route POST /profiles
// @desc Update profile for given id
// @access Private

exports.updateProfile = asyncHandler(async (req, res, next) => {
  const {
    firstName,
    lastName,
    description,
    email,
    gender,
    phoneNumber,
    birthDate,
    address /*TODO  PLAN TO ADD AVAILABILITY IN ANOTHER MODEL*/,
    /* availability: { startDate, endDate, daysOfWeek }, */
  } = req.body;

  await Profile.updateOne(
    { email: req.body.email },
    {
      firstName,
      lastName,
      description,
      email,
      gender,
      phoneNumber,
      address,
      birthDate /*TODO */,
      /* availability: {
        startDate,
        endDate,
        daysOfWeek,
    }, */
    },
    function (err) {
      if (err) {
        res.status(500).send("Internal Server Error!");
      }
      res.status(200).send("Profile updated successfully");
    }
  );
});

exports.uploadImage =
  (uploadS3.single("file"),
  async (req, res) => {
    if (req.files.file === null) {
      return res.status(400).json({ msg: "no file is uploaded" });
    }

    const uploadedFile = req.files.file;

    const file = req.files.file;

    file.mv(`${__dirname}/${file.name}`, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
      console.log("image moved to server");
    });

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await delay(500);

    try {
      const params = {
        Bucket: "teamruntimeterror",
        Key: uploadedFile.name,

        Body: fs.createReadStream(`${__dirname}/${uploadedFile.name}`),
      };
      s3.upload(params, (err, data) => {
        if (err) {
          console.log(err);
          return res.status(500).send(err);
        }
        console.log(`File uploaded successfully. ${data.Location}`);
        fs.unlink(`${__dirname}/${uploadedFile.name}`, (err) => {
          if (err) {
            console.log(err);
          }
          console.log("successfully deleted from server");
        });
        res.json({
          fileName: uploadedFile.name,
          filePath: data.Location,
        });
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  });

exports.payment = asyncHandler(async (req, res, next) => {
  res.send("id received successfully");
});
