import express from 'express'
import mongoose from 'mongoose'
import config from './config/database.js'
import router from './routes/routes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app= express()

mongoose.connect(config.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', ()=> console.log('connected to Database'))
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:3000/login', 'http://localhost:3000/welcome'] 
 }))
app.use(express.json())

app.use('/', router)

export default app