import {RESTDataSource} from '@apollo/datasource-rest'
import { MessageModel } from '../../models/message.js'
import { ConversationModel } from '../../models/conversation.js';

class MessageAPI extends RESTDataSource {
  async getMessages(id) {
    const messages = await MessageModel.find({conversationId: id});
    return messages;
  }
  async getConversations(id) {
    const conversations = await ConversationModel.find({users: { $in: [id] }});
    return conversations;
  }
}

export default MessageAPI;
