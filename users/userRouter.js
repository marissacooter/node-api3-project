const express = require('express');
const users = require("./userDb")
const posts = require("../posts/postDb")

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  const user = req.body
  users
    .insert(user)
    .then((data) => {
      res.status(201).json(user)
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({
        message: "Error adding the user to the database."
      })
    })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  const id = req.user.id
  const post = {
    ...req.body, user_id: id
  }
  if (!req.body.text) {
    return res.status(400).json({
      message: "Need a value for text."
    })
  }
  posts
    .insert(post)
    .then((post) => {
      res.status(201).json(post)
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({
        message: "Could not create user post."
      })
    })
});

router.get('/', (req, res) => {
  users
    .get()
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error retrieving the users."
      })
    })
});

router.get('/:id', (req, res) => {
  const id = req.params.id
  users
    .getById(id)
    .then((user) => {
      if (user) {
        res.status(200).json(user)
      } else {
        res.status(404).json({
          message: "User not found."
        })
      }
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({
        message: "Error retrieving the user."
      })
    })
});

router.get('/:id/posts', (req, res) => {
  users
  .getUserPosts(userId)
  .then((posts) => {
    res.status(200).json(posts)
  })
  .catch((error) => {
    console.log(error)
    res.status(500).json({
      message: "Could not get user posts."
    })
  })
});

router.delete('/:id', (req, res) => {
  users
    .remove(id)
    .then((user) => {
      res.status(200).json({
        message: "The user has been deleted."
      })
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({
        message: "Error removing the user."
      })
    })
});

router.put('/:id', (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({
      message: "Missing name."
    })
  }
  users
    .update(id, changes)
    .then((user) => {
      if (user) {
        res.status(200).json(user)
      } else {
        res.status(404).json({
          message: "The user could not be found."
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



//custom middleware

function validateUserId(req, res, next) {
  const id = req.params.id
  users.getById(id)
    .then((user) => {
      if (user) {
        req.user = user
        console.log(user)
        next()
      } else {
        res.status(404).json({
          message: "User not found."
        })
      }
    })
    .catch(next)
}

function validateUser(req, res, next) {
  if (!req.body) {
    return res.status(400).json({
      message: "Missing user data."
    })
  }
  next()
}

function validatePost(req, res, next) {
  if (!req.body || !req.body.text) {
    return res.status(400).json({
      message: "Missing post data or required text field."
    })
  }
  next()
}

module.exports = router;
