import express from 'express';
import Pokedex from 'pokedex-promise-v2';

import { Trainer } from '../models/trainer.js'
import { generateAccessToken, authenticateToken } from '../utilities/jwt.js';

const pokedex = new Pokedex();

export const router = express.Router()

router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    const query = new Trainer({
        username: username,
        password: password
    })

    try {
        await query.save();
        res.status(200).json({"message": "sucessfully registered"});
    } catch (error) {
        res.status(400).json({"message": "tray again later"});
        console.log(error);
    }
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const query = Trainer.findOne({username, password});
    query.select('username');
    query.exec(function (error, response) {
        if (response) {
            res.status(200).json({"message": "sucessfully login", "token": generateAccessToken(response.username)});
        } else {
            res.status(400).json({"message": "invalid username or password"});
            console.log(error)
        }
    });
})

router.get('/pokemons', authenticateToken, async (req, res) => {
    pokedex.getPokemonsList({limit: 10, offset: 10 }).then((response) => {
        console.log(response);
        res.status(200).json(response);
    })
})
