import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        required: false
    }
})

export const UserModel = mongoose.model('User', userSchema, 'user');


