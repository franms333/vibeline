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
    return conversations;
  }
}

export default MessageAPI;
