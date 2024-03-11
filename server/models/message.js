import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    conversationId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }    
}, {timestamps: true})

export const MessageModel = mongoose.model('Message', messageSchema, 'message');


