import express from "express";
import {
  getCar,
  getCars,
  createCar,
  deleteCar,
  updateCar,
  getCarByType,
  getCarByColor,
  getCarByModel,
  getCarByCompany,
  getPaginatedCarDetails,
} from "../controllers/Car.js";
import { verifyUser } from "../utils/verifyToken.js"; // importing jwt custom function from verify token directory
//create a new router object
const router = express.Router();

//Add Car
router.post("/create", verifyUser, createCar); //POST http://localhost:8800/api/cars/create
//All Cars List
router.get("/list", verifyUser, getCars); // GET http://localhost:8800/api/cars/list
//Search Car By Id
router.get("/search/:id", verifyUser, getCar); //GET http://localhost:8800/api/cars/search/:id
//Update Car By Id
router.post("/update/:id", verifyUser, updateCar); //POST http://localhost:8800/api/cars
//Delete Car
router.delete("/delete/:id", verifyUser, deleteCar); //DELETE http://localhost:8800/api/cars/delete/:id
//Show Car By their Company wise
router.post("/company", verifyUser, getCarByCompany); //POST http://localhost:8800/api/cars/company
//Show Paginated Cars List of limit 3
router.get("/color/:id", verifyUser, getCarByColor); //GET http://localhost:8800/api/cars/color/:id
//Filter by category
router.get("/category/:id", verifyUser, getCarByType); //GET http://localhost:8800/api/cars/category/:id
//Filter by company
router.get("/company/:id", verifyUser, getCarByCompany); //GET http://localhost:8800/api/cars/company/:id
//Filter by model
router.get("/model/:id", verifyUser, getCarByModel); //GET http://localhost:8800/api/cars/model/:id
//Paginated list of Car limit is 3 on per page
router.post("/paginated-car-list", verifyUser, getPaginatedCarDetails); //POST http://localhost:8800/api/cars/paginated-car-list
export default router;
