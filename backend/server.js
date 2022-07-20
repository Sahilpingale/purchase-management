import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import userRoutes from '../backend/routes/userRoutes.js'
import vendorRoutes from '../backend/routes/vendorRoutes.js'
import categoryRoutes from '../backend/routes/categoryRoutes.js'
import { pageNotFound, errorHandler } from './middleware/errorMiddleware.js'

// Configure Environment variables
dotenv.config()

// Connect to mongodb database
connectDB()

const app = express()

// In order to use 'req.body'
app.use(express.json())

// Routes
app.use('/api/users', userRoutes)
app.use('/api/vendors', vendorRoutes)
app.use('/api/category', categoryRoutes)

// Error Handling
app.use(pageNotFound)
app.use(errorHandler)

// Start server
const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
