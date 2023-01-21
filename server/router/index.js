import express from 'express';
import Pokedex from 'pokedex-promise-v2';

import { Trainer } from '../models/trainer.js'
import { generateAccessToken, authenticateToken } from '../utilities/jwt.js';
import { paginate } from '../utilities/common.js';

const pokedex = new Pokedex({cacheLimit: 120 * 1000});

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

router.get('/verify-token', authenticateToken, async (req, res) => {
    const { username } = req.payload;

    const query = Trainer.findOne({username});
    query.select('id username');
    query.exec(function (error, response) {
        if (response) {
            res.status(200).json({"message": "token verified", "username": response.username, "id": response.id});
        } else {
            res.status(400).json({"message": "invalid payload"});
            console.log(error)
        }
    });
})

router.get('/pokemons', authenticateToken, async (req, res) => {
    const { page_size, page_number } = req.query;

    pokedex.getPokemonsList({ limit: 2000, offset: 0 }).then((response) => {
        const results = paginate(response.results, Number(page_size), Number(page_number))

        console.log(results)

        res.status(200).json(response);
    })
})
