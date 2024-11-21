// import { HiArrowLongRight } from "react-icons/hi2";
import { useSelector } from "react-redux";
// import book1 from "../../assets/books/book-1.png";
import { Link } from "react-router-dom";
import getImgUrl from "../../utils/getImgUrl";
import { clearCart, removeFromCart } from "../../redux/features/cart/cartSlice";
import { useDispatch } from "react-redux";

const CartPage = () => {
  const cartItem = useSelector((state) => state.cart.cartItem);
  const dispatch = useDispatch();

  const totalPrice = cartItem
    .reduce((acc, item) => acc + item.newPrice, 0)
    .toFixed(2);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart({ _id: id }));
  };
  return (
    <>
      <div className="flex flex-col mx-auto h-full shadow-xl overflow-hidden mt-12 bg-white">
        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
          <div className="flex justify-between items-start">
            <div className="text-lg font-medium text-gray-900">
              Shopping cart
            </div>
            <div className="flex h-7 items-center ml-3">
              <button
                onClick={handleClearCart}
                type="button"
                className="relative -m-2 bg-red-500 px-2 py-1 text-white rounded-md hover:bg-secondary transition-all duration-200"
              >
                <span>Clear cart</span>
              </button>
            </div>
          </div>

          <div className="mt-8 ">
            <div className="flow-root">
              {cartItem && cartItem.length > 0 ? (
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {cartItem.map((item, i) => (
                    <li className="flex py-6" key={i}>
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={`${getImgUrl(item?.coverImage)}`}
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900 flex-wrap">
                            <h3>
                              <Link to="/">{item?.title}</Link>
                            </h3>
                            <p className="sm:ml-4">{item?.newPrice}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500 capitalize">
                            <strong>Catagory:</strong> {item?.category}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end space-y-2 justify-between flex-wrap">
                          <p className="text-gray-500 text-sm">
                            <strong>Qty:</strong> 1
                          </p>
                          <div>
                            <button
                              onClick={() => handleRemoveFromCart(item._id)}
                              type="button"
                              className="text-indigo-600 font-medium hover:text-indigo-500"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No Product Here</p>
              )}

              {/* <div>No Product</div> */}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900 ">
            <p>Subtital</p>
            <p>${totalPrice ? totalPrice : 0}</p>
          </div>
          <p className="text-sm text-gray-500 mt-0.5">
            Shopping and taxes calculated at checkout
          </p>

          <div className="mt-6">
            <Link
              to="/checkout"
              className="bg-indigo-600 hover:bg-indigo-800 rounded-md py-3 px-6 shadow-sm text-white w-full flex justify-center items-center border border-transparent text-base font-medium"
            >
              Checkout
            </Link>
          </div>

          <div className="mt-6 flex justify-center items-center text-sm text-gray-500 ">
            <Link to="/">
              or
              <button className="font-medium text-indigo-600 hover:text-indigo-500 ml-1">
                Continue Shopping{" "}
                <span aria-hidden="true">
                  {" "}
                  &rarr;
                  {/* <HiArrowLongRight size={20} /> */}
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
