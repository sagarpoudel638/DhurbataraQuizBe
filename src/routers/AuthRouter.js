import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import { createUser, findUser } from "../models/user/UserModel.js";

export const router = express.Router();

//User registration
router.post("/signup", async (req, res) => {
    try {
      console.log(req.body);
      const { fName, lName, email, password, phone } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashedpassword = await bcrypt.hash(password, salt);
      const userData = await createUser({
        fName,
        lName,
        phone,
        email,
        password: hashedpassword,
      });
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
export default router;