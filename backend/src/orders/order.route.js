const express = require("express");
const { createOrder, getOrderbyEmail } = require("./order.controller.js");

const router = express.Router();

// create router endpoint
router.post("/", createOrder);

// get order by user email
router.get("/email/:email", getOrderbyEmail);

module.exports = router;
