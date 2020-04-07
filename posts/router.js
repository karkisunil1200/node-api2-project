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

router.post('/', (req, res) => {
  const post = req.body;

  db.insert(post)
    .then(posts => {
      if (post) {
        res.status(201).json(posts);
      } else {
        res.status(404).json({message: 'Please provide title and contents for the post'});
      }
    })
    .catch(err => {
      res.status(500).json({message: 'There was an error whie saving the post to the database'});
    });
});

router.post('/:id/comments', (req, res) => {
  const post = req.body;
  const id = req.params.id;

  db.insertComment(post)
    .then(comment => {
      if (comment) {
        res.status(201).json(comment);
      } else if (comment.post_id !== id) {
        res.status(404).json({message: 'The post with the specified ID does not exist'});
      } else {
        res.status(400).json({message: 'Please provide text for the comment'});
      }
    })
    .catch(err => {
      res.status(500).json({
        message: 'There was an error while saving the comment to the database',
        error: err.message
      });
    });
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const changes = req.body;

  db.update(id, changes)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(400).json({message: 'Please provide title and contents for the post'});
      }
    })
    .catch(err => {
      res.status(500).json({message: "The post couldn't not be modified", error: err.message});
    });
});

router.delete('/:id', (req, res) => {
  const {id} = req.params;

  db.remove(id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({message: 'The post with the specified ID does not exist'});
      }
    })
    .catch(err => {
      res.status(500).json({message: 'The post could not be removed', error: err.message});
    });
});

module.exports = router;
