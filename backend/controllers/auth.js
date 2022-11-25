import generator from "generate-password"; // used to generate random password
import bcrypt from "bcryptjs"; // used to store passwords as hashed passwords in database instead of plaintext
import jwt from "jsonwebtoken"; // used to securely transmitting information between parties
import nodemailer from "nodemailer"; // Nodemailer is used for send Email
import User from "../models/User.js"; // Mongoose Car Scheme
import { createError } from "../utils/error.js"; // custom Error Component to show errors details

//register controller
export const register = async (req, res, next) => {
  try {
    const { username, email } = req.body;
    const randomPassword = generator.generate({
      // randomly generate password
      length: 8,
      numbers: true,
    });
    //convert email to  lowercase
    const emailLowerCase = email.toLowerCase();
    const gmailId = "testmail4803@gmail.com";
    const appPassword = "kquimuokqmdiwnfo";
    const sender = "testmail4803@gmail.com";
    const subjectText = "Thank You for Sign Up";
    //checking whether the user is already registered or not
    const existedUser = await User.findOne({ email: emailLowerCase });
    if (existedUser) {
      console.log("Email Already Registered");
      return res
        .status(400)
        .json({ success: false, message: "User already exists!" });
      
    }
    // create Nodemailer reusable transporter object
    let mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailId,
        pass: appPassword,
      },
    });
    //  defined transport object
    let details = {
      from: sender, // sender address
      to: emailLowerCase, //  receiver address
      subject: subjectText, // Subject line
      // concatenating multiple string and variables
      html:
        "Hi " +
        username +
        "!I am very happy to welcome you on Ropstam Test Task App." +
        "Your Credentials are:" +
        " Email: " +
        emailLowerCase +
        "Your Password Is : " +
        randomPassword,
    };
    // Preview sent information
    console.log(details);
    // Message sent through Nodemailer
    mailTransporter.sendMail(details, function (err, message) {
      if (err) {
        console.log("it has an error", err);
      } else {
        console.log(message);
        res.status(200).send(message);
      }
    });

    //adding salt to protect the password against rainbow table attacks
    const salt = bcrypt.genSaltSync(10);

    // BCrypt Algorithm encrypting the password using the salt with random generated password
    const hash = bcrypt.hashSync(randomPassword, salt);
    const newUser = new User({
      ...req.body,
      email: emailLowerCase,
      password: hash,
    });

    //save new user in the database
    await newUser.save();
    res.status(200).send("User has been created.");
  } catch (err) {
    next(err);
  }
};

// login controller
export const login = async (req, res, next) => {
  try {
    // Find one user whose email is equal to the request body email.
    const user = await User.findOne({ email: req.body.email });
    //if given email didn't match then throw error massage
    if (!user) return next(createError(404, "User not found!"));
    //bcryot algoritj compare tha given password to the hash password
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    //throw error if password didn't match
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));
    //Synchronous Sign with default (HMAC SHA256)
    const token = jwt.sign({ id: user._id }, process.env.JWT);

    // stores the raw value of the user document
    const { password } = user._doc;
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      password: password,
      token: token,
    });
  } catch (err) {
    next(err);
  }
};
