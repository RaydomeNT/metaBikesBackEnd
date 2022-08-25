const { Router } = require("express");
const userRouter = Router();
const { createUser, login, getAllUsers, updateEmail, deleteUser, updateUser } = require("./controllers");
const { hashPass, comparePasswords, tokenAuth, newHashPass, emailCheck } = require("../middleware");

userRouter.post("/user", emailCheck, hashPass, createUser);
userRouter.post("/login", comparePasswords, login);
userRouter.get("/list", getAllUsers);
userRouter.get("/login", tokenAuth, login);
userRouter.patch("/update", updateEmail);
userRouter.delete("/delete", deleteUser);
userRouter.patch('/user', emailCheck, comparePasswords, newHashPass, updateUser);

module.exports = userRouter;