// import { useEffect } from "react";
import { useState } from "react";
import BookCard from "../books/BookCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useFechAllBooksQuery } from "../../redux/features/book/bookAPI";


const TopSeller = () => {
  // ปิดmock ไปใช้ข้อมูลจาก api
  // const [bookData, setBookData] = useState([]);
  const [selectCatagory, setSelectCatagory] = useState("Choose a genre");

  const catagory = [
    "Choose a genre",
    "Business",
    "Fiction",
    "Horror",
    "Adventure",
  ];
  // ปิดmock ไปใช้ข้อมูลจาก api
  // useEffect(() => {
  //   fetch("book.json")
  //     .then((res) => res.json())
  //     .then((data) => setBookData(data));
  // }, []);
  //   console.log(bookData);

  //   allbook = selectCatagory="Choose a genre"

  // จากApi
  const { data: bookData = [] } = useFechAllBooksQuery();
  // console.log("data", bookData);

  const filteredBook =
    selectCatagory === "Choose a genre"
      ? bookData
      : bookData.filter(
          (book) => book.category === selectCatagory.toLocaleLowerCase()
        );

  // console.log(filteredBook);

  return (
    <div className="py-10">
      <h2 className="text-3xl font-semibold mb-6">Top Sellers</h2>

      {/* catagory filter */}
      <div className="mb-8 flex items-center">
        <select
          name="category"
          id="category"
          className="border bg-[#eaeaea] border-gray-300 rounded-md px-4 py-2  focus:outline-none"
          onChange={(e) => setSelectCatagory(e.target.value)}
        >
          {catagory.map((cate, index) => (
            <option key={index} value={cate}>
              {cate}
            </option>
          ))}
        </select>
      </div>

      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        navigation={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          1180: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination, Navigation]}
        // className="mySwiper"
      >
        {filteredBook.length > 0 &&
          filteredBook.map((book, i) => (
            <SwiperSlide key={i}>
              <BookCard key={i} book={book} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default TopSeller;
