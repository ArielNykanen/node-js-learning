const express = require('express');

const feedCtrl = require('../controllers/feed')

const router = express.Router();

router.get('/posts', feedCtrl.getPosts);

router.post('/post', feedCtrl.createPost);

module.exports = router;