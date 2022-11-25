import jwt from "jsonwebtoken";
import { createError } from "./error.js";
import asyncHandler from "express-async-handler";

// Middleware that Store JWT Token& Cookies and use it for authentication
export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }

  //Middleware used to verify token
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = user;
    next();
  });
};

//Middleware that check whether the user is authorized or not
export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      console.log('verified')
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};
