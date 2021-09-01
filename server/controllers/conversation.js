const Message = require("../models/Message");
const Conversation = require("../models/Conversation");
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

exports.getAllConversations = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  await Conversation.aggregate([
    {
      $match: {
        $or: [
          { user1Id: mongoose.Types.ObjectId(userId) },
          { user2Id: mongoose.Types.ObjectId(userId) },
        ],
      },
    },
    {
      $lookup: {
        from: "messages",
        localField: "_id",
        foreignField: "conversationId",
        as: "messages",
      },
    },
    {
      $sort: {
        "messages.createdAt": 1,
      },
    },
  ]).exec((err, conversations) => {
    if (err) {
      res.status(500).send("Internal server error");
    }

    for (let i = 0; i < conversations.length; i++) {
      const convo = conversations[i];
      convo.latestMessageText =
        convo.messages[convo.messages.length - 1].messageText;
      conversations[i] = convo;
    }

    res.json({
      status: true,
      status_code: 200,
      conversations: conversations,
      message: "Conversations fetched successfully",
    });
  });
});

exports.getAllMessagesForConvo = asyncHandler(async (req, res, next) => {
  const conversationId = req.params.convoId;

  await Message.find({ conversationId: conversationId }).exec(
    (err, messages) => {
      if (err) {
        res.status(500).send("Something went wrong");
      } else {
        res.json({
          status: true,
          status_code: 200,
          conversation: messages,
          message: "Messages fetched successfully",
        });
      }
    }
  );
});
