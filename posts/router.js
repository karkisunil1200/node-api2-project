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

router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({message: 'The post with the specified ID does not exist'});
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({message: 'The post information could not be reterived', error: err.message});
    });
});

router.get('/:id/comments', (req, res) => {
  const id = req.params.id;

  db.findCommentById(id)
    .then(comment => {
      if (comment) {
        res.status(201).json(comment);
      } else {
        res.status(404).json({message: 'The post with the specified ID does not exist'});
      }
    })
    .catch(err => {
      res.status(500).json({
        message: 'There was an error while saving the comment to the database',
        error: err.message
      });
    });
});

module.exports = router;
