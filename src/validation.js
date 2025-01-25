const validator = require('validator');

const validateSignupData = (req) => {
    const {firstName,lastName,email,password} = req.body;

    if (!firstName || !lastName) {
        throw new Error("Firstname and lastname are required");
    }
    else if(!validator.isEmail) {
        throw new Error("Invalid email");
    }
    else if(!validator.isStrongPassword) {
        throw new Error("Password should be strong");
    }
}

module.exports = {
    validateSignupData,
}