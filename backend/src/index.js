const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");
const app = express();


mongoose.connect(
  "mongodb+srv://bruno159:643512@cluster0-kdvlv.mongodb.net/week10?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
  }
);

//CORS BLOQUEIA ACESSO A API, 
//DEIXANDO SEM ARGUMENTOS QUALQUER UM PODE ACESSAR
app.use(cors());

app.use(express.json());

app.use(routes);

app.listen(3333);
