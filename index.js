const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();
//queries controllers
const {
  getUsers,
  getUsersById,
  createUser,
  updateUser,
  deleteUser
} = require("./queries");

const port = 3000;

app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get("/", (req, res) => {
  res.json({ info: "Node.js, Express and Postgres API" });
});
  
app.get("/users", getUsers);
app.get("/users/:id", getUsersById);
app.post("/users", createUser);
app.put("/users/:id", updateUser);
app.delete("/users/:id", deleteUser);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
