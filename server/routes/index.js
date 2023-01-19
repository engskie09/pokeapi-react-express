const express = require('express');

const router = express.Router()

router.post('/post', (req, res) => {
    res.send('Post API')
})

router.get('/get', (req, res) => {
    res.send('Get All API')
})

module.exports = router;
