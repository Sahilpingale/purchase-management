import dotenv from 'dotenv'
import Items from './backend/models/itemModel.js'
import connectDB from './backend/config/db.js'
import itemData from './backend/data/itemData.js'
import colors from 'colors'

// Configure Enviroment variables
dotenv.config()

// Connect to mongodb database
connectDB()

const importData = async () => {
  try {
    const createItems = await Items.insertMany(itemData)
    console.log('Data Imported!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

importData()
