const express = require("express")
const server = require("./server")
const logger = require("./middleware/logger")

server.use(express.json())
server.use(logger())
