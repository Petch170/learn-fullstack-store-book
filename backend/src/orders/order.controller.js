const Order = require("./order.model");

exports.createOrder = async (req, res) => {
  try {
    const newOrder = await Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (error) {
    console.log(error);
    res.status(500).json({ Message: "failed to create order", error });
  }
};

exports.getOrderbyEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const order = await Order.find({ email }).sort({ createAt: -1 });
    if (!order) { return res.status(404).json({ Message: "order not found" });
    } 
    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ Message: "failed to fetch order", error });
  }
};
