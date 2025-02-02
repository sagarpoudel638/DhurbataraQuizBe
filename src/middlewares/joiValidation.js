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
    name: Joi.string().required().messages({
      'string.empty': 'Name is required',
    }),
    email: Joi.string().email({ minDomainSegments: 2 }).required().messages({
      'string.email': 'A valid email is required',
      'any.required': 'Email is required',
    }),
    phoneNumber: Joi.string()
      .pattern(/^[0-9]{10}$/)
      .allow('')
      .messages({
        'string.pattern.base': 'Phone number must be exactly 10 digits',
      }),
    password: Joi.string().min(8).required().messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 8 characters long',
    }),
    profilePicture: Joi.string().uri().allow('').messages({
      'string.uri': 'Profile picture must be a valid URL',
    }),
    role: Joi.string().valid('student', 'admin').default('student').messages({
      'any.only': 'Role must be either student or admin',
    }),
  });

  JoiValidator(req, res, next, signupSchema);
};
