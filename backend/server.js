import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import userRoutes from '../backend/routes/userRoutes.js'

// Configure Environment variables
dotenv.config()

// Connect to mongodb database
connectDB()

const app = express()

app.use('/api/users', userRoutes)
app.get('/', (req, res) => {
  res.send('Api is running ')
})

const PORT = process.env.PORT || 5000

// Start server
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
