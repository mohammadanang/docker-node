const express = require('express')
const app = express()
const http = require("http").Server(app)
require("./db") // database connection
// const io    = require("socket.io")(http),
//     redis   = require("redis"),
//     client  = redis.createClient()

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname))

require("api-inti").connection(process.env.HOST)

// require("./lib/listener") // listening to rabbitmq
require('./routes/main')(app) // all routes imported

app.get("/chat", (req, res, next) => {
    res.sendFile(__dirname + '/views/template.html')
})

http.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
})

// io.on('connection', (socket) => {
//     const subscribe = redis.createClient()
//     subscribe.subscribe('pubsub')

//     subscribe.on("message", (channel, message) => {
//         socket.send(message)
//     })

//     socket.on("message", (msg) => {
        
//         client.publish('pubsub', msg)
//     })

//     socket.on("disconnect", () => {
//         subscribe.quit()
//     })
// })
