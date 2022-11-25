import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true, // you must fill email field.
    unique: true, //email must be unique
    trim: true, // remove white spaces
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model("User", UserSchema);
