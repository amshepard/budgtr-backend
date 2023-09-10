const express = require("express");
const router = express.Router();

const transactionArray = require("../models/transactions.js");

// Middleware to check if a transaction exists
function transactionExists(req, res, next) {
  const index = parseInt(req.params.arrayIndex, 10);
  if (!isNaN(index) && transactionArray[index]) {
    req.transactionIndex = index;
    next();
  } else {
    res.status(404).json({ error: "Not Found" });
  }
}

// INDEX
router.get("/", (req, res) => {
  res.json(transactionArray);
});

// SHOW (GET)
router.get("/:arrayIndex", transactionExists, (req, res) => {
  res.json(transactionArray[req.transactionIndex]);
});

// CREATE (POST)
router.post("/", (req, res) => {
  transactionArray.push(req.body);
  res.json(transactionArray[transactionArray.length - 1]);
});

// DELETE
router.delete("/:arrayIndex", transactionExists, (req, res) => {
  const deletedTransaction = transactionArray.splice(req.transactionIndex, 1);
  res.status(200).json(deletedTransaction);
});

// UPDATE (PUT)
router.put("/:arrayIndex", transactionExists, (req, res) => {
  transactionArray[req.transactionIndex] = req.body;
  res.status(200).json(transactionArray[req.transactionIndex]);
});

module.exports = router;
