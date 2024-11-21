import bannerImg from "../../assets/banner.png";

const Banner = () => {
  return (
    <div className=" flex flex-col-reverse md:flex-row py-16 justify-between items-center gap-12">
      {/* left banner */}
      <div className="md:w-1/2 w-full">
        <h1 className="md:text-5xl text-2xl font-medium mb-7">
          New Releases This Week
        </h1>
        <p className="mb-10">
          It&apos;s time to update your reading list with some of the latest and
          greatest releases in the literary world. From heart-pumping thrillers
          to captivating memoirs, this week&apos;s new releases offer something
          for everyone
        </p>
        <div className="flex justify-center md:justify-start">
          <button className="btn-primary ">Subscribe</button>
        </div>
      </div>

      {/* right banner */}
      <div className="md:w-1/2 w-full flex items-center md:justify-end">
        <img src={bannerImg} alt={bannerImg}></img>
      </div>
    </div>
  );
};

export default Banner;
