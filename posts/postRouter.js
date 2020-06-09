const express = require('express');
const posts = require('./postDb')
const users = require('../users/userDb')

const router = express.Router();

router.get('/', (req, res) => {
  posts
  .get()
  .then((data) => {
    res.status(200).json(data)
  })
  .catch((error) => {
    res.status(500).json({
      message: "Error retrieving the posts."
    })
  })
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
