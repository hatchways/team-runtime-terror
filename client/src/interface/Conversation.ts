export interface Message {
  id: string;
  senderId: string;
  messageText: string;
  createdAt: string;
}

export interface Conversation {
  _id: string;
  otherUser: string;
  otherUserId: string;
  messages?: Message[];
}
