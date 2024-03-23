import {RESTDataSource} from '@apollo/datasource-rest'
import { MessageModel } from '../../models/message.js'
import { ConversationModel } from '../../models/conversation.js';
import { UserModel } from '../../models/user.js';

class MessageAPI extends RESTDataSource {
  async getUser(userId) {
    const user = await UserModel.findOne({_id: userId});
    return user;
  }
  async getMessages(conversationId) {
    const messages = await MessageModel.find({conversationId: conversationId});
    return messages;
  }
  async getConversations(userId) {
    const conversations = await ConversationModel.find({users: { $in: [userId] }});
    const parsedConversations = await Promise.all(conversations.map(async (conversation) => {
      const lastMessage = await MessageModel.findOne({ conversationId: conversation._id }).sort({ createdAt: -1 }).limit(1);
      
      return {
        ...conversation.toObject(), // Convert Mongoose document to plain JavaScript object
        id: conversation._id,
        lastMessage
      };
    }));

    return parsedConversations;
  }

  async getConversation(conversationId) {
    const conversation = await ConversationModel.findById(conversationId);
    const lastMessage = await MessageModel.findOne({ conversationId: conversationId }).sort({ createdAt: -1 }).limit(1);

    return {
      id: conversation._id,
      ...conversation.toObject(),
      lastMessage
    }
  }
}

export default MessageAPI;
