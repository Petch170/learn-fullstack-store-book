const express = require("express");
const app = express();
var cors = require("cors");

const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
require("dotenv").config();

const bookRoutes = require("./src/books/book.route.js");
const orderRoutes = require("./src/orders/order.route.js");
const userRoutes = require("./src/users/user.route.js");
const adminRoutes = require("./src/stats/admin.stats.js");

const DB_URL = process.env.DB_URL;

app.use(express.json());
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));
async function main() {
  await mongoose.connect(DB_URL);
}

// routes ...

app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Hello World! 5558899009");
});

main()
  .then(() => console.log("Connected to DB 333"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
