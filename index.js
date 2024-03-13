const express = require("express");
const app = express();
const port = process.env.port || 5000;
const cors = require("cors");
const mongoose = require("mongoose");
const UserModel = require("./models/model");
const Post = require("./models/posts");
const path = require("path");
const { mongoUrl } = require("./keys");


app.use(cors());
app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/createPost"));
app.use(require("./routes/User"));
mongoose.connect(mongoUrl);
mongoose.connection.on("connected", () => {
  console.log("successfully connected to the db");
});
mongoose.connection.on("error", () => {
  console.log("error connecting to the db");
});

app.use(express.static(path.join(__dirname, "./frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "./frontend/dist/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

app.listen(port, (req, res) => {
  console.log(`Listening on port ${port}`);
});
