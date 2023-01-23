import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
    trainer_id: {
        required: true,
        type: mongoose.Types.ObjectId
    },
    name: {
        required: true,
        type: String
    },
    pokemons: {
        required: true,
        type: [{name: String, url: String}],
    },
});

export const Team = mongoose.model('Team', teamSchema)
