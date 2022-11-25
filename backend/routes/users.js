import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} from "../controllers/user.js";
import { verifyToken, verifyUser } from "../utils/verifyToken.js"; //importing jwt based custom functions from utils

//create a new router object
const router = express.Router();

//Verifying the identity of a user
router.get("/checkauthentication", verifyToken, (req, res, next) => {
  res.send("hello user, you are logged in");
});
//Verifying user
router.get("/checkuser/:id", verifyUser, (req, res, next) => {
  res.send("hello user, you are logged in and you can delete your account");
});

//Update User
router.put("/:id", verifyUser, updateUser); //UPDATE http://localhost:8800/api/users/:id

//Delete User
router.delete("/:id", verifyUser, deleteUser); //DELETE http://localhost:8800/api/users/:id

//Show single user details
router.get("/:id", verifyUser, getUser); //POST http://localhost:8800/api/users/:id

//Show  All users details
router.get("/", getUsers); //GET http://localhost:8800/api/users/

export default router;
