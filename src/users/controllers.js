const jwt = require("jsonwebtoken");
const User = require("./model");

exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    const token = await jwt.sign({ _id: newUser._id }, process.env.SECRET); //creates token with user id inside
    //generate token using newUser_ID
    console.log(newUser);
    res.status(200).send({ msg: "New user added", newUser, token }); //sends success message and the token in the repsonse
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: error });
  }
}; //create user works. /user with post in TC

exports.login = async (req, res) => {
  try {
    const token = await jwt.sign({ _id: req.user._id }, process.env.SECRET); //creates token with user id inside
    //generate token using newUser_ID
    res.status(200).send({ user: req.user, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: error });
  }
}; //token auth works.

//Mongoose read, update & delete
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    const result = users.map((u) => {
      return u.username;
    });
    res.status(200).send({ allUsers: result });
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: error });
  }
}; //works in TC. use get & /list, no code needed in body, returns list of usernames.

exports.updateEmail = async (req, res) => {
  try {
    const newEmail = await User.findOneAndUpdate(
      { username: req.body.username },
      { $set: { email: req.body.email } }
    );
    res.status(200).send({ message: req.body.email });
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: error });
  }
}; //update email works in TC, patch
//   {
//     "username" : "enter user name",
//     "email" : "enter new email address"
//   }

exports.deleteUser = async (req, res) => {
  try {
    await User.findOneAndDelete({ username: req.body.username });
    res.status(200).send({ message: "User Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: error });
  }
}; //delete user works in TC. Delete /delete "username":"enter the username to be deleted"

exports.updateUser = async (req, res) => {
    console.log(req.body);
    console.log('userUpdate');
    try {const updates = await {
            username: req.body.new_username,
            email: req.body.new_email,
            password: req.body.new_password,};  
            userUpdate =await User.updateOne({ username: req.body.username }, { $set: updates });
            console.log(updates);
            res.send({ msg: "This came from updateUser", userUpdate, updates  });}
    catch (error) {console.log(error); res.send({ err: error });}
    };