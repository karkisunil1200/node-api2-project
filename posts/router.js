const express = require('express');
const db = require('../data/db');

const router = express.Router();

router.get('/', (req, res) => {
  db.find()
    .then(posts => {
      if (posts) {
        res.status(201).json(posts);
      } else {
        res.status(400).json({errorMessage: 'Please provide title and contents for the post'});
      }
    })
    .catch(err => {
      res.status(500).json({message: 'cannot get post', error: err.message});
    });
});

module.exports = router;
