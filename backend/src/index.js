const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");
const app = express();

// mongodb+srv://bruno159:bruno159@cluster0-kdvlv.mongodb.net/test?retryWrites=true&w=majority
mongoose.connect(
  "mongodb+srv://bruno159:bruno159@cluster0-kdvlv.mongodb.net/week10?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
  }
);

app.use(cors());

app.use(express.json());

app.use(routes);

app.listen(3333);
