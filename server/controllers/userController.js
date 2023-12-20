import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { saveAccessTokenInCookies } from "../utils/index.js";
import otpModel from "../otp/otpModel.js";
import userModel from "../models/userModel.js";
import sendMail from "../utils/sendMail.js";

export const signup = async (req, resp) => {
  try {
    console.log(req.file);
    const { email, firstName, lastName, password, phone,otp} = req.body;
     
    otpModel.findOne({email,otp}).then((result)=>{
      if(!result) {
        resp.status(401).json({
          status:"Failure",
          msg:"Otp is wrong"
        })
      } 
    })
    const hashedPassword = await bcrypt.hash(password, 10);
    let user = new User({
      email,
      firstName,
      lastName,
      password: hashedPassword,
      phone,

    });

    let savedUser = await user.save();
    await otpModel.deleteOne({email,otp})
    resp.status(201).json({
      status: "SUCCESS",
      msg: "User is successfully registered",
      userData: savedUser,
    });
  } catch (error) {
    console.log(error);
    resp.status(400).json({
      status: "failure",
      msg: error.message,
    });
  }
};

export const login = async (req, resp) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      resp.status(400).json({
        status: "Failure",
        msg: "All fields are required",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      resp
        .status(400)
        .json({ status: "FAILURE", msg: "All fields are required" });
    }
    const matchedPassword = await bcrypt.compare(password, user?.password);
    if (!matchedPassword) {
      return resp
        .status(400)
        .json({ status: "FAILURE", msg: "Invalid Credentials" });
    }
    if (user.length == 0) {
      return resp.status(400).json({ msg: "No user found" });
    }

    const accessToken = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      process.env.ACCESS_SECRET,
      { expiresIn: "1h" } // 1 hour validity
    );

    saveAccessTokenInCookies(resp, accessToken);
    resp.status(200).json({
      status: "SUCCESS",
      message: "Login Successful",
      user: {
        userId: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    resp.status(400).json({
      status: "Failure",
      msg: error.message,
    });
  }
};


export const sendOtpForSignup = async (req, res) => {
  try {
    const { email } = req?.body;
    console.log("email", email);
    let exitingUser = await userModel.find({ email: email });

    console.log("exitingUser", exitingUser);
    if (exitingUser?.length > 0) {
      return res.status(400).json({
        success: false,
        message: "User already exist",
      });
    }
    let otp = Math.floor(Math.random() * 100000 + 1000000 - 100000);
    sendMail(email, otp).then(async () => {
      let otpDetailsDoc = new otpModel({ email, otp });
      await otpDetailsDoc.save();
      return res
        .status(200)
        .json({ success: true, message: "Sent Mail  successfully" });
    });
  } catch (err) {
    console.log("error", err);
    res.status(500).json({ success: false, message: err?.message ?? err });
  }
};