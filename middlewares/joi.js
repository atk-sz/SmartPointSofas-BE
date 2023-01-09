const Joi = require("joi");

//auth
const signupSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.base": `"Name" should be in 'text'`,
    "string.empty": `"Name" cannot be an empty`,
    "string.min": `"Name" should have a minimum length of {#limit}`,
    "string.max": `"Name" should have a maximum length of {#limit}`,
    "any.required": `"Name" is a required field`,
  }),
  phone: Joi.number().required().messages({
    "any.required": `"Phone Number" is required`,
  }),
  role: Joi.string().optional(),
});

const signinSchema = Joi.object({
  phone: Joi.number().required().messages({
    "any.required": `"Phone Number" is required`,
  }),
  password: Joi.string().required().messages({
    "any.required": `"Password" is required`,
  }),
});

module.exports.validateSignup = (req, res, next) => {
  const { error } = signupSchema.validate(req.body.values);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    res.status(400).send(msg);
  } else {
    next();
  }
};

module.exports.validateSignin = (req, res, next) => {
  const { error } = signinSchema.validate(req.body.values);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    res.status(400).send(msg);
  } else {
    next();
  }
};

//sofa

const sofaSchema = Joi.object({
  name: Joi.string().optional(),
  capacity: Joi.number().required(),
  color: Joi.string().required(),
  description: Joi.string().required(),
  shape: Joi.string().required(),
  dimension: Joi.object({
    h: Joi.number().required(),
    w: Joi.number().required(),
    l: Joi.number().required(),
  }),
  seat_material: Joi.string().required(),
  leg_material: Joi.string().required(),
  finish: Joi.string().required(),
});

module.exports.validateSofa = (req, res, next) => {
  const { error } = sofaSchema.validate(req.body.values);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    res.status(400).send(msg);
  } else {
    next();
  }
};

// const storeSchema = Joi.object({
//   owner: Joi.string().required(),
//   shop_name: Joi.string().min(3).max(20).required().messages({
//     "string.base": `"Shop Name" should be a type of 'text'`,
//     "string.empty": `"Shop Name" cannot be an empty field`,
//     "string.min": `"Shop Name" should have a minimum length of {#limit}`,
//     "any.required": `"Shop Name" is a required field`,
//   }),
//   PAN: Joi.string().min(3).max(20).required().messages({
//     "string.empty": `"Shop Name" cannot be an empty field`,
//     "string.min": `"Shop Name" should have a minimum length of {#limit}`,
//     "any.required": `"Shop Name" is a required field`,
//   }),
//   category: Joi.string().required(),
//   logo: Joi.string().required(),
//   phone: Joi.number().required(),
//   docs: Joi.array().min(1).max(3).required(),
//   photos: Joi.array().min(1).max(3).required(),
//   address: Joi.object({
//     first_line: Joi.string().min(5).max(50).required(),
//     second_line: Joi.string().allow("").optional(),
//     city: Joi.string().min(3).max(30).required(),
//     pincode: Joi.number().required(),
//     country: Joi.string().min(3).max(30).required(),
//   }).required(),
//   bank_details: Joi.object({
//     bank_name: Joi.string().required(),
//     ac_num: Joi.number().required(),
//     ifsc: Joi.string().required(),
//   }),
//   request: Joi.boolean().optional(),
//   verified: Joi.boolean().optional(),
// });

// const productSchema = Joi.object({
//   title: Joi.string().min(3).max(30).required(),
//   description: Joi.string().min(3).max(2000).required(),
//   price: Joi.number().required(),
//   category: Joi.string().required(),
//   subcategory: Joi.string().required(),
//   specifications: Joi.array()
//     .items(
//       Joi.object({
//         specification_name: Joi.string().min(3).max(20).required(),
//         specification: Joi.string().max(20).required(),
//       }).required()
//     )
//     .required(),
//   quantity: Joi.number().required(),
//   images: Joi.array().min(1).max(7).required(),
// });

// module.exports.validateSellerReq = (req, res, next) => {
//   const { error } = storeSchema.validate(req.body.values.values);
//   if (error) {
//     const msg = error.details.map((el) => el.message).join(",");
//     res.status(400).send(msg);
//   } else {
//     next();
//   }
// };

// module.exports.validateProduct = (req, res, next) => {
//   const { error } = productSchema.validate(req.body.values.product);
//   if (error) {
//     const msg = error.details.map((el) => el.message).join(",");
//     res.status(400).send(msg);
//   } else {
//     next();
//   }
// };
