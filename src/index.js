const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const path = require('path')
const cors = require('cors')

const app = express()
const server = http.createServer(app)
const io = socketio(server)
require('./socket')(io)

app.set('port',process.env.PORT || 3906)
app.use(express.static(path.join(__dirname,'public')))
app.use(cors())

server.listen(app.get('port'),()=>{
    console.log(`App running on port ${app.get('port')}`)
})