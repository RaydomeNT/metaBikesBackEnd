require("./db/connection"); //runs db connection imediately
const express = require("express");
const userRouter = require("./users/routes");
const app = express();
const cors = require("cors")

//add relevant routes and controllers to app before listen runs, like CRUD
app.use(express.json()); //tell entire server that it will aslways recieve json and always send back json, parsed automatically
app.use(cors());
app.use(userRouter);

app.listen(5001, () => {
  console.log("listening on port 5001");
});