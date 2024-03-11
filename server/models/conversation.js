import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema({
    users: {
        type: [String],
        required: true
    }    
}, {timestamps: true})

export const ConversationModel = mongoose.model('Conversation', conversationSchema, 'conversation');


