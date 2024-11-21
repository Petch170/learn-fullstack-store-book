const Book = require("./book.model");

exports.postABook = async (req, res) => {
  //   console.log(req.body);
  try {
    const newBook = await Book({
      ...req.body,
    });
    await newBook.save();
    res.status(200).send({ message: "Book post success", book: newBook });
  } catch (error) {
    console.log("Error creating book", error);
    res.status(500).send({ message: "failed to create book" });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const update = await Book.findByIdAndUpdate(id, req.body, { new: true });
    if (!update) {
      res.status(404).send({ message: "book not found" });
    }
    res.status(200).send({ message: "Book Update successfully", book: update });
  } catch (error) {
    console.log("Error updating book", error);
    res.status(500).send({ message: "failed to update book" });
  }
};
exports.getAllBook = async (req, res) => {
  try {
    const getall = await Book.find().sort({ createAt: -1 });
    res.status(200).send(getall);
  } catch (error) {
    console.log("Error fetching book", error);
    res.status(500).send({ message: "failed to fetch book" });
  }
};

exports.getOneBook = async (req, res) => {
  try {
    const { id } = req.params;
    const getOne = await Book.findById(id);
    if (!getOne) {
      return res.status(404).send({ message: "book not found" });
    }
    res.status(200).send(getOne);
  } catch (error) {
    console.log("Error fetching a book", error);
    res.status(500).send({ message: "failed to fetch  a  book" });
  }
};

exports.delbook = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteBook = await Book.findByIdAndDelete(id);
    if (!deleteBook) {
      return res.status(404).send({ message: "book not found" });
    }

    res.status(200).send({ message: "delete success", del: deleteBook });
  } catch (error) {
    console.log("Error Del a book", error);
    res.status(500).send({ message: "failed to delete a book" });
  }
};
