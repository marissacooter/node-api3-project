const express = require('express')
const users = require("./userDb")

const router = express.Router()

router.post('/', (req, res) => {
  
})

router.post('/:id/posts', (req, res) => {
  // do your magic!
})

router.get('/users', (req, res) => {
  users.get()
  .then((data) => {
    res.status(200).json(data)
  })
  .catch((err) => {
    console.log(err)
    res.status(500).json({
      message: "Error retrieving users"
    })
  })
})

router.get('/:id', (req, res) => {
  const id = req.params.id

  users.getById(id)
  .then((user) => {
    if (user) {
      res.status(200).json(user)
    } else {
      res.status(400).json({
        message: "User could not be found"
      })
    }
  })
  .catch((err) => {
    console.log(err)
    res.status(500).json({
      message: "Error retrieving user"
    })
  })

});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});




//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
