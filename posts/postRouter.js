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

router.get('/:id', validatePostId, (req, res) => {
  const id = req.params.id
  posts
    .getById(id)
    .then((post) => {
      if (post) {
        res.status(200).json(post)
      } else {
        res.status(404).json({
          message: "Post not found."
        })
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error retrieving the post."
      })
    })
});

router.delete('/:id', (req, res) => {
  const id = req.params.id
  posts
    .remove(id)
    .then((post) => {
      res.status(200).json({
        message: "The post has been deleted."
      })
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({
        message: "Error deleting the post."
      })
    })
});

router.put('/:id', (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      message: "Missing data."
    })
  }
  posts
    .update(id, changes)
    .then((post) => {
      if (post) {
        res.status(200).json(post)
      } else {
        res.status(404).json({
          message: "The post could not be found."
        })
      }
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({
        message: "Error updating the user."
      })
    })
});

// custom middleware

function validatePostId(req, res, next) {
  const id = req.params.id
  posts
    .getById(id)
    .then((post) => {
      if (post) {
        req.post = post
        console.log(post)
        next()
      } else {
        res.status(404).json({
          message: "Post not found."
        })
      }
    })
    .catch(next)
}

module.exports = router;
