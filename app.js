require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const { AppDataSource } = require("./src/models/data.source");
const { routes } = require("./src/routes/index");
const { globalErrorHandler } = require("./src/utils/error");

const app = express();

app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use(routes);
app.use(globalErrorHandler);

app.get("/ping", function (req, res) {
  res.status(200).json({ message: "pong" });
});

const PORT = process.env.PORT;
app.listen(PORT, async () => {
  await AppDataSource.initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
    })
    .catch((error) => {
      console.error("Error during Data Source initialization", error);
    });
  console.log(`Listening to request on port: ${PORT}`);
});
