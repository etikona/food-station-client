import banner1 from "../../../public/assets/banner-1.jpg";
import banner2 from "../../../public/assets/banner-2.jpg";
import banner3 from "../../../public/assets/banner-3.jpg";
const Banner = () => {
  return (
    <div>
      <div className="carousel w-full">
        <div id="slide1" className="carousel-item relative w-full">
          <img src={banner1} className="w-fit h-fit" />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide3" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide2" className="btn btn-circle">
              ❯
            </a>
          </div>
          <div className="absolute top-1/4 start-14 -translate-y-1/2 transform justify-between">
            <h2 className="text-8xl text-yellow-400">Nourish Bangladesh </h2>
            <p className="text-4xl mt-20 text-balance leading-normal text-white">
              Help us build a nation where no one goes hungry. Donate food and
              join us in our mission to feed the hungry and create a brighter
              future for all.
            </p>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <img src={banner2} className="w-full" />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide1" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide3" className="btn btn-circle">
              ❯
            </a>
          </div>
          <div className="absolute top-1/4 start-14 -translate-y-1/2 transform justify-between">
            <h2 className="text-8xl text-yellow-400">
              Share a Meal, Share Hope
            </h2>
            <p className="text-4xl mt-20 text-balance leading-normal text-white">
              Every meal you donate brings hope and nourishment to those in
              need. Let's come together as a community and ensure that everyone
              has access to nutritious food.
            </p>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full">
          <img src={banner3} className="w-full" />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide2" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide1" className="btn btn-circle">
              ❯
            </a>
          </div>
          <div className="absolute top-1/4 start-14 -translate-y-1/2 transform justify-between">
            <h2 className="text-8xl text-yellow-400">Food for All </h2>
            <p className="text-4xl mt-20 text-balance leading-normal text-white">
              Together, we can create a world where no one goes to bed hungry.
              Donate food and be a part of the solution to ending hunger and
              ensuring food security for all.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
