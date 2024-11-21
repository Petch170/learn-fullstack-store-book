const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const Order = require("../orders/order.model");
const Book = require("../books/book.model");

router.get("/", async (req, res) => {
  try {
    const totalOrder = await Order.countDocuments();

    // 
    const totalSales = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalSale: { $sum: "$totalPrice" },
        },
      },
    ]);


    const trandingBook = await Book.aggregate([
      { $match: { tranding: true } },
      {
        $count: "trendingBooksCount",
      },
    ]);

        // 5.Total number of books
        const totalBooks= await Book.
    // 6.Monthly sales (group by month and sum total sales for each month)
    const monthlySales = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createAt" } },
          totalSales: {
            $sum: "$totalPrice",
          }, // sum totalPrice for each month
          totalOrders: { $sum: 1 }, // Count total order for each month
        },
      },
      { $sort: { _id: 1 } },
    ]);
  } catch (error) {
    log.error(error);
    return res.status(500).send({ message: "failed to fetch stats" });
  }
});

module.exports = router;
