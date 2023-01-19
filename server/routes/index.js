const express = require('express');
const http = require('http');

const Trainer = require('../models/trainer');

const router = express.Router()

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
            res.status(200).json({"message": "sucessfully login"});
        } else {
            res.status(400).json({"message": "invalid username or password"});
            console.log(error)
        }
    });
})

router.get('/pokemons', async (req, res) => {

    var options = {
        host: 'pokeapi.co',
        path: '/api/v2/pokemon',
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }
    
      var request = http.request(options, function(response) {
        //proxyResponse.setEncoding('utf8');
        response.on('data', function (chunk) {
            console.log(chunk);
            res.status(200).send({
              ... JSON.parse(chunk)
            });
        });

        response.on('end', function () {
            console.log(response);
        });
      });
    
      request.end();
})

module.exports = router;
