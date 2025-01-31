const validator = require("validator");

const validateSignupData = (req) => {
  const { firstName, lastName } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Firstname and lastname are required");
  } else if (!validator.isEmail) {
    throw new Error("Invalid email");
  } else if (!validator.isStrongPassword) {
    throw new Error("Password should be strong");
  }
};

const validateEditData = (req) => {
  const allowedFields = ["lastname", "email", "about", "skills","gender"];
  const isAllowed = Object.keys(req.body).every((key) =>
    allowedFields.includes(key)
  );
  return isAllowed;
};

module.exports = {
  validateSignupData,
  validateEditData,
};
