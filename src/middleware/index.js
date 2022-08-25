const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require ("email-validator");
const User = require("../users/model");

exports.emailCheck=async(req,res,next)=>{
    console.log(req.body);
    console.log('emailCheck');
    try {
        if(validator.validate(req.body.email)){next();}
        else if (!validator.validate(req.body.email)){throw new Error({msg: 'Incorrect login details'});}
    } catch (error) {
        console.log(error);
        res.status(500).send({err:error});
    }
};

exports.hashPass = async (req, res, next) => {
    try {
      req.body.password = await bcrypt.hash(req.body.password, 8);
      next();
    } catch (error) {
      console.log(error);
      res.status(500).send({ err: error });
    }
  };

  exports.comparePasswords = async (req, res, next) => {
    try {
      req.user = await User.findOne({ username: req.body.username });
      if (
        req.user &&
        (await bcrypt.compare(req.body.password, req.user.password))
      ) {
        next();
      } else {
        throw new Error({ msg: "Incorrect credentials" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ err: error });
    }
  };

  exports.tokenAuth = async (req, res, next) => {
    try {
      console.log("This is tokenCheck");
      const token = req.header("Authorization");
      const decodedToken = await jwt.verify(token, process.env.SECRET);
      const user = await User.findById(decodedToken._id);
      req.user = user;
      next();
    } catch (error) {
      console.log(error);
      res.status(500).send({ err: error });
    }
  };

  exports.newHashPass = async(req,res, next)=>{
    try {
        // const pass = req.body.password;
        // const hashedPass = await bcrypt.hash(pass, 8);
        // req.body.password = hashedPass;
        req.body.new_password = await bcrypt.hash(req.body.new_password, 8);
        next();
    } catch (error) {
        console.log(error);
        res.send({err: error});
    }
};
