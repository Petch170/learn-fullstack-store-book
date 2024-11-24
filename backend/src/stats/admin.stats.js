const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const Order = require("../orders/order.model");
const Book = require("../books/book.model");

router.get("/", async (req, res) => {
  try {
    // 1. Total number of users
    // countDocuments:นับจำนวนเอกสารทั้งหมดในคอลเลกชัน
    const totalOrder = await Order.countDocuments();

    //2. Total Sales (sum of all totalprice form orders)
    // aggregate: สร้างการกระบวนการจัดกลุ่ม (group), กรอง (filter), หรือคำนวณค่าต่าง ๆ (compute) จากข้อมูลในคอลเลกชันที่อยู่ใน pipeline และส่งค่ากลับไปยัง client
    const totalSales = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalSale: { $sum: "$totalPrice" },
        },
      },
    ]);
    // 4 tranding books statistics: กรองเฉพาะหนังสือที่มีฟิลด์ tranding และมีค่า true และ $count ใช้สำหรับนับจำนวนเอกสารที่ผ่านการกรองในขั้นตอน $match โดยตัวแปร "trendingBooksCount" จะเก็บจำนวนของเอกสารที่ถูกนับไว้ มีรูปแบบเป็นอาร์เรย์ของออบเจ็กต์ เช่น: [{ "trendingBooksCount": 5 }]:[]
    const trandingBookCount = await Book.aggregate([
      { $match: { tranding: true } },
      {
        $count: "trendingBooksCount",
      },
    ]);
    // If you want just the count as a numver, yoy can exteact it like this:
    const trandingBooks =
      trandingBookCount.length > 0 ? trandingBookCount[0].trandingBookCount : 0;

    // 5.Total number of books
    const totalBooks = await Book.countDocuments();
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

    res.status(200).send({
      totalOrder,
      totalSales: totalSales[0]?.totalSale || 0,
      trandingBooks,
      totalBooks,
      monthlySales,
    });
  } catch (error) {
    log.error(error);
    return res.status(500).send({ message: "failed to fetch stats" });
  }
});

module.exports = router;
