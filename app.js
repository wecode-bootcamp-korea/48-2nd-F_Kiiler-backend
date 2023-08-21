require("dotenv").config(); // .env를 실행하겠다.

const express = require("express");

const cors = require("cors");
const morgan = require("morgan");

const { AppDataSource } = require("./src/models/data-source");

const app = express();

app.use(cors());
app.use(morgan("combined"));
app.use(express.json());

// Health check
app.get("/ping", function (req, res) {
  res.status(200).json({ message: "pong" });
});

// Start server
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
