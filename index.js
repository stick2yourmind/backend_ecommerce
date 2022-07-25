const CONFIG = require('./config/server.config.js')
const express = require('express')
const appRouter = require('./routers/app.router')
const cors = require('cors')
const corsOptions = require('./utils/cors/cors.utils')
const credentials = require('./middleware/cors.middleware')
const cookieParser = require('cookie-parser')
const path = require('path')

const app = express()

// App middlewares
// Middleware to handle JSON
app.use(express.json())
// Middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.resolve(__dirname, './public')))

// Middleware to handle options credentials check - before CORS!
app.use(credentials)

// Middleware to handle Cross Origin Resource Sharing
app.use(cors(corsOptions))

// Middleware to handle cookies
app.use(cookieParser())

// Routes
app.use('/', appRouter)

const server = app.listen(CONFIG.PORT, CONFIG.HOST, () => {
  console.log(`Server is up and running on port => ${CONFIG.PORT}`)
})

server.on('error', (error) => {
  console.log('There was an unexpected error in the server')
  console.log(error)
})
