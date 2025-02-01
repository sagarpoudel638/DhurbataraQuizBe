import Joi from "joi";


const JoiValidator = (req, res, next, schema) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.json({ message: "Error in schema" + error });
    } else {
      next();
    }
  } catch (error) {
    return res.json({ message: "Error in schema" + error });
  }
};
// Login Validator
export const loginValidator = (req, res, next) => {
  const loginSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().required(),
  });
  JoiValidator(req, res, next, loginSchema);
};

// Signup Validator

export const signupValidator = (req, res, next) => {
  const signupSchema = Joi.object({
    fName: Joi.string().required(),
    lName: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    phone: Joi.string().default(""),
    password: Joi.string().required(),
  });
  JoiValidator(req, res, next, signupSchema);
};
