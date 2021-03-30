const Joi = require("joi");
const User = require("../models/User");

const methods = {

  //REGISTER USER API
  async registerUser(req, res, next) {
    try {
      // Validation for req.body //

      const schema = Joi.object().keys({
        firstName: Joi.string().max(250).required(),
        lastName: Joi.string().max(250).required(),
        email: Joi.string().email().required(),
        phone: Joi.string()
          .max(10)
          .pattern(/^[0-9]+$/)
          .required(),
        password: Joi.string().min(6).max(255).required(),
        confirm_password: Joi.string().min(6).max(255).required(),
      });

      // Storing Error Responses in Result //
      const results = schema.validate(req.body);
      if (results.error) {
        return res.status(400).send(results.error.details[0].message);
      }

      const {
        firstName,
        lastName,
        type,
        email,
        password,
        confirm_password,
        phone,
      } = req.body;

      //// Check If Password and Confirm Password are same or not ////
      if (password !== confirm_password) {
        res.status(403).send("Password and Confirm Password are not same");
      }

      //// Check If user exist with this Email or not ////
      const result = await User.findOne({ email: email });
      if (result) {
        res.status(404).send("User already registered with this Email Address");
      } else {
        // Saving User in DataBase
        const user = await User.create({
          firstName,
          lastName,
          email,
          address,
          password,
          phone,
        });

        res.status(200).json({ user: user });
      }
    } catch (err) {
      next(err);
    }
  },


  //Login User
  async login(req, res, next) {
    const { email, password } = req.body;

    const schema = Joi.object().keys({
      email: Joi.string().max(40).required().email(),
      password: Joi.string().min(6).max(255).required(),
    });

    const results = schema.validate(req.body);
    if (results.error) {
      return res.status(400).send(results.error.details[0].message);
    }

    //validating email and password
    if (!email || !password) {
      return res.status(400).send("Please provide email and password");
    }

    // check if user exists //
    const user = await User.findOne({ email: email }).select("+password");
    if (!user) {
      return res.status(400).send("You are not registered, Please Sign up!");
    }

    // check if user exists //
    const result = await User.findOne({ email: email, status: "active" }).select(
      "+password"
    );
    if (!result) {
      return res.status(400).send("You haven't verify your email address yet");
    }
    // Check if password matches

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).send("Password is Invalid");
    }
    Helpers.sendTokenResponse(user, 200, res)
  },

  // USER Logout
  async logout(req, res, next) {
    req.session.destroy(() => {
      req.logOut();
      res.clearCookie("token");
      res.status(200).send("Logged out successfully");
    });
  },
}

module.exports = methods;

// Get token from Model create cookie and send response
const Helpers = {
  sendTokenResponse(user, statusCode, res) {
    //create token

    const token = user.getSignedJwtToken();

    const options = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };

    if (process.env.NODE_ENV === "production") {
      options.secure = true;
    }
    if (user) {
      res
        .status(statusCode)
        .cookie("token", token, options)
        .json({ token: token, user: user });
    } else {
      res.send("Something went wrong");
    }
  },
}
