import User from "../models/User.js";

//controller for Update Single User details
export const updateUser = async (req,res,next)=>{
  //to handle unwanted errors during the execution
  try {
    //Finds a matching document and updates it according to the args
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
}

//controller for delete single user data after find the specific id 
export const deleteUser = async (req,res,next)=>{
  //to handle unwanted errors during the execution
  try {
    //Finds a matching document and updates it according to the args
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");
  } catch (err) {
    next(err);
  }
}

//controller for displaying Single User Details
export const getUser = async (req,res,next)=>{
   //to handle unwanted errors during the execution
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}
//controller for displaying Single User Details
export const getUsers = async (req,res,next)=>{
  // to handle unwanted errors during the execution
  try {
    // find all documents
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
}
