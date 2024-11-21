import { Link } from "react-router-dom";
import { HiBars3CenterLeft } from "react-icons/hi2";
import { IoIosSearch } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import avatarImg from "../assets/avatar.png";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../context/Authcontext";

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Orders", href: "/orders" },
  { name: "Cart Page", href: "/cart" },
  { name: "Checkout", href: "/checkout" },
];
const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // console.log(isDropdownOpen);

  // หลังจากสร้างfirebaseแล้ว ให้ดึง currentUserจาก auth มาใช้งาน แทนmanual
  // const currentUser = true;
  // const currentUser = false;
  const { currentUser, logOut } = useAuth();
  // console.log(currentUser);

  const handleLogout = () => {
    logOut();
  };

  // useEffect(() => {
  //   console.log("curentUser", currentUser);
  // }, [currentUser]);

  // ใช้useSelectorสำหรับ ดึงข้อมูล state จาก Redux store มาใช้ในคอมโพเนนต์ แล้วนำไปแดงผลที่ปุ่มตะกร้า
  const cartItem = useSelector((state) => state.cart.cartItem);

  // console.log(cartItem);

  return (
    <header className="max-w-screen-2xl mx-auto px-4 py-6">
      <nav className="flex justify-between items-center">
        {/* left side */}
        <div className="flex items-center  md:gap-16 gap-4">
          <Link to="/">
            {" "}
            <HiBars3CenterLeft className=" size-6" />
          </Link>

          {/* searh input */}
          <div className="relative sm:w-72 w-40 space-x-2">
            <IoIosSearch className=" inline-block  absolute  left-4 inset-y-2" />
            <input
              type="text"
              placeholder="Search here"
              className="bg-[#eaeaea] w-full py-1 md:px-8 px-6 rounded-md focus:outline-none"
            />
          </div>
        </div>

        {/* right side */}
        <div className="relative flex items-center md:space-x-3  space-x-2">
          <div>
            {currentUser ? (
              <>
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  <img
                    src={avatarImg}
                    alt=""
                    className={`size-7 rounded-full ${
                      currentUser ? "ring-2 ring-blue-500" : ""
                    }`}
                  />
                </button>
                {/* show Dropdown */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40">
                    <ul className="py-2">
                      {navigation.map((nav) => (
                        <li
                          key={nav.name}
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <Link
                            to={nav.href}
                            className="block px-4 py-2 text-sm hover:bg-gray-100"
                          >
                            {nav.name}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <button
                          className="block w-full px-4 py-2 text-sm hover:bg-gray-100 text-left"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login">
                <CiUser className="size-6" />
              </Link>
            )}
          </div>
          <button className="hidden sm:block">
            <IoIosHeartEmpty className="size-6" />
          </button>
          <Link
            to="/cart"
            className="bg-primary p-1 sm:px-6 px-2 flex items-center rounded-sm"
          >
            <IoCartOutline className="size-6" />
            {cartItem.length > 0 ? (
              <span className="font-semibold text-sm sm:ml-1">
                {cartItem.length}
              </span>
            ) : (
              <span className="font-semibold text-sm sm:ml-1">0</span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
