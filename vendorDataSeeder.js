import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from './backend/models/userModel.js'
import Vendor from './backend/models/vendorModel.js'
import Category from './backend/models/categoryModel.js'
import connectDB from './backend/config/db.js'
import vendorData from './backend/data/vendorData.js'
import colors from 'colors'

// Configure Enviroment variables
dotenv.config()

// Connect to mongodb database
connectDB()

const importData = async () => {
  try {
    const createVendors = await Vendor.insertMany(vendorData)
    console.log('Data Imported!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

importData()
