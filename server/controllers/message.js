const Message = require("../models/Message");
const Conversation = require("../models/Conversation");
const asyncHandler = require("express-async-handler");

exports.sendMessage = asyncHandler(async (req, res, next) => {
  const { recipientId, conversationId, messageText } = req.body;
  const senderId = req.user.id;

  if (conversationId) {
    Conversation.findOne({ _id: conversationId }, async function (err) {
      if (err) {
        return res.status(404).send("Conversation not found");
      } else {
        const message = await Message.create({
          conversationId,
          senderId,
          messageText,
        });

        res.json({
          status: true,
          status_code: 201,
          data: message,
          message: "Message sent successfully",
        });
      }
    });
  } else {
    const conversation = await Conversation.create({
      user1Id: senderId,
      user2Id: recipientId,
    });

    const convoId = conversation._id;

    const message = await Message.create({
      conversationId: convoId,
      senderId,
      messageText,
    });

    res.json({
      status: true,
      status_code: 201,
      data: message,
      message: "Message sent successfully",
    });
  }
});
