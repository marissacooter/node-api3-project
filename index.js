const express = require("express")
const logger = require("./middleware/logger")
const userRouter = require("./users/userRouter")
const postRouter = require("./posts/postRouter")

const server = express()
const port = 5000

server.use(express.json())
server.use(logger("long"))
server.use('/api/users', userRouter)
server.use('/api/posts', postRouter)


server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})