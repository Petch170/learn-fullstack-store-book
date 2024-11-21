import { useAuth } from "../../../context/Authcontext";
import { useGetOrderbyEmailQuery } from "../order/orderApi";

const OrderPage = () => {
  const { currentUser } = useAuth();
  const {
    data: orders = [],
    isLoading,
    isError,
  } = useGetOrderbyEmailQuery(currentUser.email);

  if (isLoading) return <div>...loading</div>;
  if (isError) return <div>Error getting Order data</div>;

  return (
    <div className="container mx-auto p-6">
      OrderPage
      <h2 className="text-2xl font-semibold mb-4">Your Order</h2>
      {orders.lengh === 0 ? (
        <div>No order not found</div>
      ) : (
        <div>
          {orders.map((item, i) => (
            <div key={item._id} className="border-b mb-4 pb-4">
              <p className=" py-1 px-3 bg-secondary text-white w-fit  rounded mb-1">
                #{i + 1}
              </p>
              <h2> OrderId:{item?._id}</h2>
              <p className="text-gray-600">Name:{item?.name}</p>
              <p className="text-gray-600">Email:{item?.email}</p>
              <p className="text-gray-600">Phone:{item?.phone}</p>
              <p className="text-gray-600">Total Price :{item?.totalPrice}</p>
              <h3 className="font-semibold mt-2">
                Address:
                <p>
                  {item?.address.city},{item?.address.state},
                  {item?.address.country},{item?.address.zipcode}
                </p>
              </h3>

              <h3 className="font-semibold mt-2">
                {" "}
                Products Id:
                <ul>
                  {item.productIds.map((product) => (
                    <li key={product}>{product}</li>
                  ))}
                </ul>
              </h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderPage;
