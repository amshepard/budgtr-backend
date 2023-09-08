// DEPENDENCIES
const express = require("express");
const cors = require("cors")

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(cors())

const transactionsController = require("./controllers/transactionsControllers")
app.use("/transactions", transactionsController)

// ROUTES
app.get("/", (req, res) => {
  res.send("BUDGTR 💰🧾");
});

  //404 page
  app.get("*", (req, res) => {
    res.status(404).json({ error: "Page not found" });
  })

// EXPORT
module.exports = app;

