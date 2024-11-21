/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Authcontext";
import { useCreateOrderMutation } from "../../redux/features/order/orderApi";
import Swal from "sweetalert2";

const CheckOutPage = () => {
  const cartItem = useSelector((state) => state.cart.cartItem);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
  const navigate = useNavigate();

  const [isChecked, setIsChecked] = useState(false);

  // const currentUser = true; // get user from auth
  const { currentUser } = useAuth();

  const totalPrice = cartItem
    .reduce((acc, item) => acc + item.newPrice, 0)
    .toFixed(2);

  const onChecked = () => {
    setIsChecked(!isChecked);
  };

  //   useEffect(() => {
  //     console.log(isChecked);
  //   });
  const onSubmit = async (data) => {
    console.log(data);
    const newOrder = {
      name: data.name,
      email: currentUser?.email,
      address: {
        city: data.city,
        country: data.country,
        state: data.state,
        zipcode: data.zipcode,
      },
      phone: data.phone,
      productIds: cartItem.map((item) => item?._id),
      totalPrice: totalPrice,
    };
    // console.log(newOrder, "newOrder");
    try {
      await createOrder(newOrder).unwrap();
      Swal.fire({
        title: "Comfirmed Order",
        text: "You order plasce success",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, It's Ok!",
      });
      navigate("/orders");
    } catch (error) {
      console.log("Error place an order", error);
      alert("Failed to place an order");
    }
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <section>
      <div>
        <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
          <div className="container max-w-screen-lg mx-auto">
            <div>
              <h2 className=" text-gray-600 font-semibold text-xl mb-2">
                Cash on Delivary
              </h2>
              <p className=" text-gray-500  mb-2">
                Total Price: ${totalPrice ? totalPrice : 0}
              </p>
              <p className=" text-gray-500 mb-2">
                Items: {cartItem.length > 0 ? cartItem.length : 0}
              </p>
            </div>
            {cartItem.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-4 md:p-8 mb-6">
                <form
                  className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 my-8"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="text-gray-600">
                    <p className="font-medium text-lg">Personal Details</p>
                    <p>Please sill out all the fields.</p>
                  </div>

                  <div className="lg:col-span-2">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                      <div className="md:col-span-5">
                        <label htmlFor="full_name">Full Name</label>
                        <input
                          {...register("name", { required: true })}
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          type="text"
                          name="name"
                          id="name"
                          placeholder="Input your full name"
                        />
                      </div>
                      <div className="md:col-span-5">
                        <label htmlFor="email">Email Address</label>
                        <input
                          {...register("email", { required: true })}
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          type="email"
                          name="email"
                          id="email"
                          placeholder="email@domain.com"
                          defaultValue={currentUser?.email}
                        />
                      </div>
                      <div className="md:col-span-5">
                        <label htmlFor="phone">Phone Number</label>
                        <input
                          {...register("phone", { required: true })}
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          type="number"
                          name="phone"
                          id="phone"
                          placeholder="+123 456 7890"
                        />
                      </div>
                      <div className="md:col-span-3">
                        <label htmlFor="address">Address/Street</label>
                        <input
                          {...register("address", { required: true })}
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          type="text"
                          name="address"
                          id="address"
                          placeholder=""
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label htmlFor="city">City</label>
                        <div className="h-10 border border-gray-200  mt-1 rounded  w-full bg-gray-50 flex">
                          <input
                            {...register("city", { required: true })}
                            className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                            type="text"
                            name="city"
                            id="city"
                            placeholder=""
                          />
                          <button className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600">
                            <svg
                              className="w-4 h-4 mx-2 fill-current"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <line x1="18" y1="6" x2="6" y2="18"></line>
                              <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                          </button>
                          <button
                            tabIndex="-1"
                            className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600"
                          >
                            <svg
                              className="w-4 h-4 mx-2 fill-current"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="18 15 12 9 6 15"></polyline>
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <label htmlFor="country">Country/ region</label>
                        <input
                          {...register("country", { required: true })}
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          type="text"
                          name="country"
                          id="country"
                          placeholder=""
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label htmlFor="state ">State/Provice</label>
                        <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1  ">
                          <input
                            {...register("state", { required: true })}
                            className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                            type="text"
                            name="state"
                            id="state"
                            placeholder=""
                          />
                          <button className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300   hover:text-red-600 ">
                            <svg
                              className="w-4 h-4 mx-2 fill-current"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <line x1="18" y1="6" x2="6" y2="18"></line>
                              <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                          </button>
                          <button
                            tabIndex="-1"
                            className="cursor-pointer focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600"
                          >
                            <svg
                              className="w-4 h-4 mx-2 fill-current"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="18 15 12 9 6 15"></polyline>
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="md:col-span-1">
                        <label htmlFor="zipcode">Zipcode</label>
                        <input
                          {...register("zipcode", { required: true })}
                          className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          type="text"
                          name="zipcode"
                          id="zipcode"
                          placeholder=""
                        />
                      </div>

                      {/* Checkbox */}
                      <div className="md:col-span-5 my-3">
                        <div className="inline-flex items-center ">
                          <input
                            type="checkbox"
                            name="billing_same"
                            id="billing_same"
                            className="form-checkbox"
                            onChange={(e) => setIsChecked(e.target.checked)}
                          />
                          <label htmlFor="billing_same" className="ml-2">
                            I am agree to the{" "}
                            <Link className="underline underline-offset-2 text-blue-600">
                              Terms & Conditions{" "}
                            </Link>
                            and {""}
                            <Link className="underline underline-offset-2 text-blue-600">
                              Shoping Policy.
                            </Link>
                          </label>
                        </div>
                      </div>

                      <div className="md:col-span-5 text-right">
                        <div className="inline-flex items-end">
                          <button
                            disabled={!isChecked}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          >
                            Place an Order
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckOutPage;
