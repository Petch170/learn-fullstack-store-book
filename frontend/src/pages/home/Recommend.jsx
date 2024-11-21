
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import BookCard from "../books/BookCard";
import { useFechAllBooksQuery } from "../../redux/features/book/bookAPI";


const Recommend = () => {
  // const [bookData, setBookData] = useState([]);

  // useEffect(() => {
  //   fetch("book.json")
  //     .then((res) => res.json())
  //     .then((data) => setBookData(data));
  // }, []);

  // from redux api
  const { data: bookData = [] } = useFechAllBooksQuery();

  return (
    <div className="py-16">
      <h2 className="text-3xl font-semibold mb-6">Recommend for you</h2>
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
        {bookData.length > 0 &&
          bookData.slice(8, 16).map((book, i) => (
            <SwiperSlide key={i}>
              <BookCard key={i} book={book} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Recommend;
