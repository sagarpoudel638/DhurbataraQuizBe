import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import { createUser, findUser } from "../models/user/UserModel.js";
import { authMiddleware } from "../middlewares/Auth.js";
import { loginValidator, signupValidator } from "../middlewares/joiValidation.js";
import { sendVerificationMail } from "../utils/mailer.js";
export const router = express.Router();

//User registration
router.post("/signup", signupValidator, async (req, res) => {
    try {
      console.log(req.body);
      const { name, email, password, phoneNumber, role } = req.body;

      const salt = await bcrypt.genSalt(10);
      const hashedpassword = await bcrypt.hash(password, salt);
      const userData = await createUser({
        name,
        phoneNumber,
        role,
        email,
        password: hashedpassword,
      });
      //verfication Token
      const verificationToken = jwt.sign(
        { _id: userData._id, email: userData.email, name: userData.name },
        config.jwtSecret,
        {
          expiresIn: "365d",
        }
      );

      userData.verificationToken = verificationToken;
      await userData.save();
      await sendVerificationMail(email, `url ${verificationToken}`);
      const respObj = {
        status: "success",
        message: "User created successfully!",
      };
      res.status(200).send(respObj);
    } catch (error) {
      let errObj = {
        status: "error",
        message: "Error Creating",
        error: {
          code: 500,
          details: error.message || "Error creating user",
        },
      };
  
      res.status(500).send(errObj);
    }
  });
  //**Login  */

router.post("/login", loginValidator, async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await findUser({ email }, true);
      if (!user) {
        return res.status(401).send({
          status: "error",
          message: "Unauthenticated",
          error: {
            code: 401,
            details: "Invalid email or password",
          },
        });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      console.log(isMatch);
      if (isMatch) {
        const token = jwt.sign(
          { _id: user._id, email: user.email, username: user.username },
          config.jwtSecret,
          {
            expiresIn: config.jwtExpire,
          }
        );
        const respObj = {
          status: "success",
          message: "Login Successful",
          data: { user: user.name, token },
        };
        console.log(respObj);
        res.status(200).send(respObj);
      } else {
        return res.status(401).send({
          status: "error",
          message: "Unauthenticated",
          error: {
            code: 401,
            details: "Invalid email or password",
          },
        });
      }
    } catch (error) {
      let errObj = {
        status: "error",
        message: "Error Login",
        error: {
          code: 500,
          details: error.message || "Error Login user",
        },
      };
  
      res.status(500).send(errObj);
    }
  });
  
  router.get("/verify", authMiddleware, async (req, res) => {
    const respObj = {
      status: "success",
      message: "Verified",
      data: { email: req.user.email, _id: req.user._id },
    };
  
    return res.status(200).send(respObj);
  });
  
export default router;