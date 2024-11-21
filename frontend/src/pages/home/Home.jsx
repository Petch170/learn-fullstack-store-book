import Banner from "./Banner";
import News from "./News";
import Recommend from "./Recommend";
import TopSeller from "./TopSeller";

const Home = () => {
  return (
    <div>
      <Banner />
      <TopSeller />
      <Recommend />
      <News />
    </div>
  );
};

export default Home;
