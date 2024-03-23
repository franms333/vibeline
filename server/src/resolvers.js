import jwt from 'jsonwebtoken';
import { UserModel } from "../models/user.js";
import { ConversationModel } from '../models/conversation.js';
import { MessageModel } from '../models/message.js';

// Imports for Subscription
import { PubSub } from 'graphql-subscriptions';

// // Instance of PubSub class for working with subscriptions
const pubsub = new PubSub();

export const resolvers = {
    Query: {
        login: async(_, {username}) => {
            const user = await UserModel.findOne({username: username});
            if(!user){
                throw new Error('User does not exist!');
            }
            const token = jwt.sign({
                userId:user.id, 
                username:user.username
            }, 'somesupersecretkey', {
                expiresIn:'1hr'
            });            

            return {
                userId: user.id,
                username: user.username,
                token: token,
                tokenExpiration: 1
            }
        },
        Messages: async(_, {conversationId}, {dataSources}) => {
            return dataSources.messageAPI.getMessages(conversationId);
        },
        Conversations: async(_, {userId}, {dataSources}) => {
            const conversations = await dataSources.messageAPI.getConversations(userId);            

            const mappedConversations = await Promise.all(conversations.map(async (conversation) => {
                const filteredUsers = conversation.users.filter((user)=> user !== userId);
                const mappedUsers = await Promise.all(filteredUsers.map(async (user) => {
                  if(user !== userId){
                    const fetchedUser = await UserModel.findOne({ _id: user });
                    return fetchedUser;
                  }
                }));
                
                return {
                  id: conversation._id,
                  users: mappedUsers,
                  createdAt: conversation.createdAt,
                  updatedAt: conversation.updatedAt,
                  lastMessage: conversation.lastMessage
                };
            }));
                        
            return mappedConversations;
        },
        Conversation: async(_, {conversationId}, {dataSources}) => {
            return dataSources.messageAPI.getConversation(conversationId);
        }
    },
    Mutation: {
        createUser: async (_, {userInput}) => { 
            try {
                const existingUser = await UserModel.findOne({username: userInput.username});
                if(existingUser){
                    throw new Error('User exists already.')
                }
    
                const user = new UserModel({
                    username: userInput.username,
                    profilePic: userInput.profilePic
                });
    
                const result = await user.save();
                return {...result._doc, id:result._doc._id}
            } catch (error) {
                return error
            }
        },
        createConversation: async (_, {conversationInput}) => {
            try {
                const conversation = new ConversationModel({
                    users:[...conversationInput.users]
                });              
                const result = await conversation.save();
                return {id:result._doc._id, ...result._doc}
            } catch (error) {
                return error;
            }            
        },
        addMessage: async (_, {messageInput}) => {
            // Model for Message Subscription
            pubsub.publish('MESSAGE_ADDED', {messageAdded:{
                ...messageInput,
                createdAt:new Date()
            }});

            // Model and Operation for saving the message in the MongoDB Database
            try {
                const message = new MessageModel({
                    text:messageInput.text,
                    conversationId: messageInput.conversationId,
                    userId: messageInput.userId
                });              
                const result = await message.save();
                return {id:result._doc._id, ...result._doc}
            } catch (error) {
                return error;
            }   
        }
    },
    Subscription: {
        messageAdded: {
            subscribe: () => pubsub.asyncIterator(['MESSAGE_ADDED'])
        }
    }
}