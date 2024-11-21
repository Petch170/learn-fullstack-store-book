// maintain api
const express = require("express");

const router = express.Router();
const {
  getAllBook,
  getOneBook,
  delbook,
  postABook,
  updateBook,
} = require("./book.controller");
const verifyAdminToken = require("../middleware/verifyAdminToken");

// post a book
router.post("/create-book", verifyAdminToken, postABook);

// get all books
router.get("/", getAllBook);
router.get("/onebook/:id", getOneBook);
router.delete("/del/:id", delbook);
router.put("/edit/:id", updateBook);
module.exports = router;
