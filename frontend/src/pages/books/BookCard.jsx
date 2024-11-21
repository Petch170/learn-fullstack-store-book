import { FiShoppingCart } from "react-icons/fi";
import getImgUrl from "../../utils/getImgUrl";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";

const BookCard = ({ book }) => {
  const dispatch = useDispatch();

  //addToCart ส่ง action ไปยัง Redux store เพื่อให้ store ทำการอัปเดต state ด้วยข้อมูลสินค้าที่เพิ่มเข้าไปในตะกร้า (cartItem) โดยใช้ action addToCart (product จะเป็นชื่ออืื่นก็ได้)
  // logic กดปุ่ม add to cart แล้วเพิ่มจำนวนbook ในnavbar

  const addBookToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className=" rounded-lg transition-shadow duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center sm:h-72  sm:justify-center gap-4">
        <div className="sm:h-72 sm:flex-shrink-0 border rounded-md">
          <Link to={`/books/${book?._id}`}>
            <img
              src={`${getImgUrl(book?.coverImage)}`}
              alt=""
              className="w-full bg-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
            />
          </Link>
        </div>

        <div>
          <Link to={`/books/${book?._id}`}>
            <h3 className="text-xl font-semibold hover:text-blue-600 mb-3">
              {book?.title}
            </h3>
          </Link>
          <p className="text-gray-600 mb-5">
            {/* ตัดความยาวของdescription มากกว่า80 ตัว แล้วใส่... แทน ถ้าน้อยกว่า80 ให้ใส่ข้อมูลทั้งหมด*/}
            {book?.description.length > 80
              ? `${book?.description.slice(0, 80)}...`
              : book?.description}
          </p>
          <p className="font-medium mb-5">
            {book?.newPrice}{" "}
            <span className="line-through font-normal ml-2">
              {book?.oldPrice}
            </span>
          </p>
          <button
            className="btn-primary px-6 space-x-1 flex items-center gap-1 "
            onClick={() => addBookToCart(book)}
          >
            <FiShoppingCart className="" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

BookCard.propTypes = {
  book: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.string,
    trending: PropTypes.bool,
    coverImage: PropTypes.string,
    oldPrice: PropTypes.number,
    newPrice: PropTypes.number,
  }),
};

export default BookCard;
