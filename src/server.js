require("./db/connection"); //runs db connection imediately
const express = require("express");
const userRouter = require("./users/routes");
const app = express();
const cors = require("cors")
const serverPort = 5001;
const port = process.env.PORT || serverPort;

//add relevant routes and controllers to app before listen runs, like CRUD
app.use(express.json()); //tell entire server that it will aslways recieve json and always send back json, parsed automatically
app.use(cors());
app.use(userRouter);

app.listen(port, () => {
  console.log("listening on port", port);
});