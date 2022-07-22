import mongoose from 'mongoose'

const itemSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  unitOfMeasurement: {
    type: String,
    required: true,
  },
  vendorName: {
    type: String,
    required: true,
  },
  clientName: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  taxAmount: {
    type: Number,
  },
  additionalCost: {
    type: Number,
  },
  dateOfPurchase: {
    type: String,
  },
})

const Item = mongoose.model('Item', itemSchema)

export default Item
