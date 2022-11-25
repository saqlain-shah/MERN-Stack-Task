import mongoose from "mongoose";
//defining schema of Car
const CarSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  make: {
    type: String,
    required: true,
  },
  registrationNo: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Car", CarSchema);
