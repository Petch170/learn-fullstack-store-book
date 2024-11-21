import { FiShoppingCart } from "react-icons/fi";
import getImgUrl from "../../utils/getImgUrl";

import { useParams } from "react-router-dom";

import { addToCart } from "../../redux/features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { useFechOneBookQuery } from "../../redux/features/book/bookAPI";

const SingleBook = () => {
  const { id } = useParams();
  const { data: book, isLoading, isError } = useFechOneBookQuery(id);
  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  if (isLoading) return <div>...loading</div>;
  if (isError) return <div>Error happending to laod book info</div>;

  return (
    <div className="max-w-lg shadow-md p-5">
      <h1 className="text-2xl font-bold mb-6">{book?.title}</h1>
      <div className="">
        <div className="">
          <img
            src={`${getImgUrl(book?.coverImage)}`}
            alt={`${book.title}`}
            className="mb-8 "
          />
        </div>
        <div className="mb-5">
          <p className="text-gray-700 mb-2">
            <strong>Author:</strong> {book?.author || "admin"}
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Publshhed:</strong>
            {new Date(book?.createAt).toLocaleDateString()}
          </p>
          <p className="text-gray-700 mb-4 capitalize">
            <strong>Category:</strong>

            {book?.category}
          </p>
          <p className="text-gray-700">
            <strong>Description:</strong>
            {book?.description}
          </p>
        </div>

        <button
          onClick={() => handleAddToCart(book)}
          className="btn-primary flex items-center gap-1 space-x-1"
        >
          <FiShoppingCart />
          <span className="">add to cart</span>
        </button>
      </div>
    </div>
  );
};

export default SingleBook;
