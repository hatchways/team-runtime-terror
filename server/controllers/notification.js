const asyncHandler = require("express-async-handler");
const Notification = require("../models/Notification");
const User = require("../models/User");

exports.createNotification = asyncHandler(async (req, res, next) => {
  const body = req.body;
  try {
    const user = await User.findById(req.user.id);
    const notification = await Notification.create({
      to: body.to,
      from: req.user.id,
      notification: body.notification,
      profilePic: user.profilePic,
      contestId: body.contestId,
    });
    res.status(201).json(notification);
  } catch (err) {
    res.status(500).json(err);
  }
});

exports.getNotification = asyncHandler(async (req, res, next) => {
  try {
    const allNotifications = await Notification.find({
      to: req.user.id,
    });
    res.status(200).json(allNotifications);
  } catch (err) {
    res.status(500).json(err);
  }
});

exports.getAllNotification = asyncHandler(async (req, res, next) => {
  try {
    const allNotifications = await Notification.find({
      to: req.user.id,
    });
    res.status(200).json(allNotifications);
  } catch (err) {
    res.status(500).json(err);
  }
});

exports.markNotification = asyncHandler(async (req, res, next) => {
  const body = req.body;
  const newNotification = {
    opened: body.opened,
    to: body.to,
    from: body.from,
    notification: body.notification,
    contestId: body.contestId,
  };
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      newNotification,
      { new: true }
    );
    res.status(200).json(notification);
  } catch (err) {
    res.status(500).json(err);
  }
});

// const mongoose = require("mongoose");
// const asyncHandler = require("express-async-handler");
// const decodeToken = require("../utils/decodeToken");
// const jwt = require("jsonwebtoken");

// const Notification = require("../models/Notifications");

// // @route GET /notifications/all
// // Get all notifications
// exports.getAllNotifications = asyncHandler(async (req, res) => {
//   let decoded = decodeToken(req.cookies.token);
//   const userId = decoded.id;
//   try {
//     const allNotifications = await Notification.find({ recipient: userId });
//     if (allNotifications) {
//       res.status(200).json({ notifications: allNotifications });
//     } else {
//       res.status(404).json({ message: "Notifications not found" });
//     }
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ error: "Could not get notifications for this user" });
//   }
// });

// // @route GET /notifications/unread
// // Get all unread notifications
// exports.getUnreadNotifications = asyncHandler(async (req, res) => {
//   let decoded = decodeToken(req.cookies.token);
//   const userId = decoded.id;
//   try {
//     const unreadNotifications = await Notification.find({
//       $and: [{ recipient: userId }, { read: false }],
//     });
//     if (unreadNotifications) {
//       res.status(200).json({ notifications: unreadNotifications });
//     } else {
//       res.status(404).json({ message: "Unread notifications not found" });
//     }
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ error: "Could not get read notifications for this user" });
//   }
// });

// // @route POST /notifications/new
// // Create new notification
// exports.newNotification = asyncHandler(async (req, res) => {
//   const { type, title, content, recipient } = req.body;
//   let decoded = decodeToken(req.cookies.token);
//   const userId = decoded.id;
//   console.log(type, title, content, recipient, userId);
//   try {
//     const notification = await Notification.create({
//       sender: userId,
//       recipient,
//       type,
//       title,
//       content,
//     });
//     console.log(notification);
//     res.status(201).json({
//       notification,
//     });
//   } catch (error) {
//     return res.status(500).json({ error: "Could not post notification" });
//   }
// });

// // @route PATCH /notifications/read/:id
// // Mark notification as read
// exports.readNotification = asyncHandler(async (req, res) => {
//   const notificationId = req.params.id;
//   try {
//     await Notification.findOneAndUpdate(
//       { _id: notificationId },
//       { read: true }
//     );
//     console.log(`notification: ${notificationId} has been updated`);
//     res.status(200).json({
//       notification,
//     });
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ error: "Could not mark notification as read" });
//   }
// });

// // @route PATCH /notifications/readall
// // Mark all notifications as read
// exports.readAllNotifications = asyncHandler(async (req, res) => {
//   let decoded = decodeToken(req.cookies.token);
//   const userId = decoded.id;
//   try {
//     const unreadNotifications = await Notification.updateMany(
//       { $and: [{ recipient: userId }, { read: false }] },
//       { read: true }
//     );
//     res.status(200).json({ notifications: unreadNotifications });
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ error: "Could not mark all notifications as read" });
//   }
// });
