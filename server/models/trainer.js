import mongoose from 'mongoose';

const trainerSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    }
})

export const Trainer = mongoose.model('Trainer', trainerSchema)
