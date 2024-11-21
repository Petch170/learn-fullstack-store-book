/* eslint-disable no-unused-vars */
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/Authcontext";

const Login = () => {
  const [message, setMessage] = useState("");
  const naigate = useNavigate();
  const { loginUser, signInWithGoogle } = useAuth();
  // console.log(loginUser);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // onsubmit ทำต่อหลังจากสร้างauth firebase เสร็จแล้ว และ import มาใช้งาน ใช้ async และ trycath ในการregister และsetmessage
  const onSubmit = async (data) => {
    // console.log(data);
    try {
      await loginUser(data.email, data.password);
      alert("user Login successfully");
      naigate("/");
    } catch (error) {
      setMessage("Please provide a valid email and password");
      console.log(error);
    }
  };

  // หลังจากสร้าง auth context google signin
  const handleGoogleSignin = async () => {
    try {
      await signInWithGoogle();
      alert("user Login with google successfully");
      naigate("/");
    } catch (error) {
      setMessage("Google Signin failed");
      console.error(error);
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] border flex justify-center items-center">
      <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
        <h2 className="text-xl font-semibold mb-4">Please login</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              name="email"
              id="email"
              placeholder="Email Address"
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              password
            </label>
            <input
              {...register("password", { required: true })}
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
            />
          </div>
          {message && (
            <p className="text-red-500 text-xs italic mb-3">{message}</p>
          )}
          <div>
            <button className="bg-blue-500 hover:bg-blue-700  text-white px-8 py-2 rounded">
              Login
            </button>
          </div>
        </form>

        <p className="align-baseline font-medium mt-4 text-sm">
          Haven&apos;t an account? Please{" "}
          <Link to="/register" className=" text-blue-500 hover:text-blue-700">
            Register
          </Link>
        </p>

        {/* google sign-in */}
        <div className="mt-4">
          <button
            className=" px-4 py-2 rounded flex items-center justify-center flex-wrap gap-1 bg-secondary hover:bg-blue-700 text-white focus:outline-none w-full"
            onClick={handleGoogleSignin}
          >
            <FaGoogle className="mr-2" />
            sign in with google
          </button>
        </div>

        <p className="mt-5 text-center text-sm text-gray-500">
          2025 Book Store. All rights reserved.{" "}
        </p>
      </div>
    </div>
  );
};

export default Login;
