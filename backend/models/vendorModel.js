import mongoose from 'mongoose'

const vendorSchema = mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
    },
    person_name: {
      type: String,
      required: true,
    },
    contact_number_1: {
      type: [String],
      required: true,
    },
    designation: {
      type: String,
    },
    area: {
      type: String,
    },
    plant_location: {
      type: String,
    },
    vendor_classification: {
      type: String,
    },
    email: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Vendor = mongoose.model('Vendor', vendorSchema)
export default Vendor
