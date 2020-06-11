require('dotenv').config()
const express = require("express")
const logger = require("./middleware/logger")
const userRouter = require("./users/userRouter")
const postRouter = require("./posts/postRouter")

const server = express()
const port = process.env.PORT || 5000;

server.use(express.json())
server.use(logger("long"))
server.use('/api/users', userRouter)
server.use('/api/posts', postRouter)

server.get('/', (req, res) => {
    res.status(200).json({ api: 'online' });
});


server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})