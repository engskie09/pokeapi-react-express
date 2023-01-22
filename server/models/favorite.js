import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema({
    trainer_id: {
        required: true,
        type: mongoose.Types.ObjectId
    },
    pokemon: {
        required: true,
        type: String
    },
    url: {
        required: true,
        type: String
    },
})

export const Favorite = mongoose.model('Favorite', favoriteSchema)
