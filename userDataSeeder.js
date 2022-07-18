import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from './backend/models/userModel.js'
import connectDB from './backend/config/db.js'
import userData from './backend/data/userData.js'
import colors from 'colors'

// Configure Enviroment variables
dotenv.config()

// Connect to mongodb database
connectDB()

const importData = async () => {
  try {
    const createUsers = await User.insertMany(userData)
    console.log('Data Imported!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

importData()
