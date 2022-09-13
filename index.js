import app from './app.js'
import http from 'http'
import config from './config/database.js'

const server=http.createServer(app)

server.listen(config.PORT)