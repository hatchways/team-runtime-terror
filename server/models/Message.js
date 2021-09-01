const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = mongoose.Schema({
  conversationId: {
    type: Schema.Types.ObjectId,
    ref: "Conversation",
    required: true,
  },
  senderId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  messageText: {
    type: String,
    required: true,
  },
  messageStatus: {
    type: Boolean,
    default: false,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Message = mongoose.model("message", messageSchema);
