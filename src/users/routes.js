const { Router } = require("express");
const userRouter = Router();
const { createUser, login, getAllUsers, updateEmail, deleteUser, updateUser } = require("./controllers");
const { hashPass, comparePasswords, tokenAuth, newHashPass } = require("../middleware");

userRouter.post("/user", hashPass, createUser);
userRouter.post("/login", comparePasswords, login);
userRouter.get("/list", getAllUsers);
userRouter.get("/login", tokenAuth, login);
userRouter.patch("/update", updateEmail);
userRouter.delete("/delete", deleteUser);
userRouter.patch('/user', comparePasswords, newHashPass, updateUser);

module.exports = userRouter;