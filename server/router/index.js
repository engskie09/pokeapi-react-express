import express from 'express';
import Pokedex from 'pokedex-promise-v2';

import { Trainer } from '../models/trainer.js';
import { Favorite } from '../models/favorite.js';

import { generateAccessToken, authenticateToken } from '../utilities/jwt.js';
import { paginate, filterPokemonByName } from '../utilities/common.js';

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
        res.status(400).json({"message": "try again later"});
        console.log(error);
    }
});

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
});

router.get('/verify-token', authenticateToken, async (req, res) => {
    const { username } = req.payload;

    const query = Trainer.findOne({username});
    query.select('id username');
    query.exec((error, response) => {
        if (response) {
            res.status(200).json({"message": "token verified", "username": response.username, "id": response.id});
        } else {
            res.status(400).json({"message": "invalid payload"});
            console.log(error)
        }
    });
});

router.get('/pokemons', authenticateToken, async (req, res) => {
    const { page_size, page_number, name } = req.query;

    pokedex.getPokemonsList({ limit: 2000, offset: 0 }).then((response) => {
        const results = filterPokemonByName(response.results, name ?? '')

        response.results = paginate(results, Number(page_size), Number(page_number));
        response.count = results.length;

        res.status(200).json(response);
    })
});

router.get('/pokemon/:name', authenticateToken, async (req, res) => {
    const { name } = req.params;
    const { username } = req.payload;

    pokedex.getPokemonsList({ limit: 2000, offset: 0 }).then((response) => {
        const results = response.results;

        const pokemon = results.find((result) => result.name === name);

        const trainerQuery = Trainer.findOne({username});
        trainerQuery.select('id username');
        trainerQuery.exec(async (error, response) => {
            if (response) {
                const favoriteQuery = Favorite.findOne({trainer_id: response.id, pokemon: name});
                favoriteQuery.exec((error, response) => {
                    if (response) {
                        pokemon.is_favorite = true;
                        res.status(200).json(pokemon);
                    } else {
                        pokemon.is_favorite = false;
                        res.status(200).json(pokemon);
                    }   
                })
                
            } else {
                res.status(400).json({"message": "invalid payload"});
                console.log(error)
            }
        });
    })
});

router.get('/favorites', authenticateToken, async (req, res) => {
    const { username } = req.payload;

    const trainerQuery = Trainer.findOne({username});
    trainerQuery.select('id username');
    trainerQuery.exec(async (error, response) => {
        if (response) {
            const favoriteQuery = Favorite.find({trainer_id: response.id});
            favoriteQuery.exec((error, response) => {
                if (response) {
                    res.status(200).json(response);
                } else {
                    res.status(400).json({"message": "cannot delete favorite pokemon"});
                }
            })
            
        } else {
            res.status(400).json({"message": "invalid payload"});
            console.log(error)
        }
    });
});

router.post('/favorite', authenticateToken, async (req, res) => {
    const { pokemon, url } = req.body;
    const { username } = req.payload;

    const trainerQuery = Trainer.findOne({username});
    trainerQuery.select('id username');
    trainerQuery.exec(async (error, response) => {
        if (response) {
            const favoriteQuery = new Favorite({
                trainer_id: response.id,
                pokemon,
                url
            })

            try {
                await favoriteQuery.save();
                res.status(200).json({"message": "succesfully added as favorite pokemon"});
            } catch (error) {
                res.status(400).json({"message": "cannot add as favorite pokemon"});
                console.log(error);
            }
        } else {
            res.status(400).json({"message": "invalid payload"});
            console.log(error)
        }
    });
});

router.delete('/favorite/:pokemon', authenticateToken, async (req, res) => {
    const { pokemon } = req.params;
    const { username } = req.payload;

    const trainerQuery = Trainer.findOne({username});
    trainerQuery.select('id username');
    trainerQuery.exec(async (error, response) => {
        if (response) {
            const favoriteQuery = Favorite.findOneAndDelete({username, pokemon});
            favoriteQuery.exec((error, response) => {
                if (response) {
                    res.status(200).json({"message": "succesfully deleted as favorite pokemon"});
                } else {
                    res.status(400).json({"message": "cannot delete favorite pokemon"});
                }   
            })

        } else {
            res.status(400).json({"message": "invalid payload"});
            console.log(error)
        }
    });
});
