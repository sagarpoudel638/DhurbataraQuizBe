import { User } from "./UserSchema.js";

export const createUser = async (user) => {
    const newUser = new User(user);
    return await newUser.save();
  };

  export const findUser = async (query, showPassword = false) => {
    const data = showPassword
      ? await User.findOne(query).select("+password")
      : await User.findOne(query);
  
    return data;
  };

  export const getUserbyEmail = async (email) => {
    return await User.findOne(email);
  }

