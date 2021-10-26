const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const pinRouter = require("./routes/pin");
const userRouter = require("./routes/user");
const middlewares = require("./middlewares/not-found");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.static(__dirname +"./uploads/"));
app.use(cors());

const PORT = 8000;

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database Connected");
  })
  .catch((err) => {
    console.log(err.message);
  });

//api creation if an endpoint  

app.use("/api/pins", pinRouter);

app.use("/api/users", userRouter);

// Creating a middlewares
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

app.listen(PORT, () => {
  console.log("server is running on port", PORT);
});
