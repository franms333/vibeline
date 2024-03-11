import jwt from 'jsonwebtoken';
import { UserModel } from "../models/user.js";
import { ConversationModel } from '../models/conversation.js';
import { MessageModel } from '../models/message.js';

// Imports for Subscription
import { PubSub } from 'graphql-subscriptions';

// // Instance of PubSub class for working with subscriptions
const pubsub = new PubSub();

let currentNumber = 0;
function incrementNumber() {
    currentNumber++;
    pubsub.publish('NUMBER_INCREMENTED', { numberIncremented: currentNumber });
    setTimeout(incrementNumber, 1000);
}

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
            return dataSources.messageAPI.getConversations(userId);
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
            console.log(messageInput)
            pubsub.publish('MESSAGE_ADDED', {messageAdded:messageInput})
            // console.log(pubsub);
            // incrementNumber(pubsub);
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
            // esto funciona ↓↓↓
            // subscribe: () => pubsub.asyncIterator(['NUMBER_INCREMENTED'])


            subscribe: () => pubsub.asyncIterator(['MESSAGE_ADDED'])
            // resolve: (payload) => {
            //     console.log(payload);
            // }
            // subscribe: () => pubsub.asyncIterator(['MESSAGE_ADDED'])
        }
    }
}