import img1 from "./../assets/hero-real-estate-facts-trends.jpeg";
import img2 from "./../assets/house-2511060_1280.jpg";
import img3 from "./../assets/pexels-binyaminmellish-106399.jpg";
const Slider = () => {
  return (
    <div className="carousel  relative max-h-screen w-full">
      <div id="slide1" className="carousel-item relative w-full">
        <img src={img1} className="w-full" />
        <div className="absolute bg-black h-full w-full bg-opacity-50"></div>
        <div className="absolute text-center top-1/2 left-1/2 -translate-x-1/2 text-neutral-content">
          <div className="max-w-md">
            <h1 className="md:mb-5 md:text-3xl lg:text-5xl text-2xl font-bold">
              Eco-Friendly Living
            </h1>
            <p className="  hidden md:block">
              Discover the perfect blend of modern comfort and sustainability in
              a serene environment. Experience a lifestyle that prioritizes both
              your well-being and the planet's health.
            </p>
          </div>
        </div>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a
            href="#slide3"
            className="btn btn-circle btn-ghost bg-slate-100 hover:bg-slate-100 hover:bg-opacity-10 bg-opacity-20"
          >
            ❮
          </a>
          <a
            href="#slide2"
            className="btn btn-circle btn-ghost bg-slate-100 hover:bg-slate-100 hover:bg-opacity-10 bg-opacity-20"
          >
            ❯
          </a>
        </div>
      </div>
      <div id="slide2" className="carousel-item relative w-full">
        <img src={img2} className="w-full" />
        <div className="absolute bg-black h-full w-full bg-opacity-50"></div>
        <div className="absolute text-center top-1/2 left-1/2 -translate-x-1/2 text-neutral-content">
          <div className="max-w-md">
            <h1 className="md:mb-5 md:text-3xl lg:text-5xl text-2xl font-bold">
              Nature-Inspired Living
            </h1>
            <p className=" hidden md:block">
              Immerse yourself in a home that combines sustainable living with
              contemporary comfort. Experience a sanctuary designed to nurture
              both you and the environment.
            </p>
          </div>
        </div>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a
            href="#slide1"
            className="btn btn-circle  btn-ghost bg-slate-100 hover:bg-slate-100 hover:bg-opacity-10 bg-opacity-20"
          >
            ❮
          </a>
          <a
            href="#slide3"
            className="btn btn-circle btn-ghost bg-slate-100 hover:bg-slate-100 hover:bg-opacity-10 bg-opacity-20"
          >
            ❯
          </a>
        </div>
      </div>
      <div id="slide3" className="carousel-item relative w-full">
        <img src={img3} className="w-full" />
        <div className="absolute bg-black h-full w-full bg-opacity-50"></div>
        <div className="absolute text-center top-1/2 left-1/2 -translate-x-1/2 text-neutral-content">
          <div className="max-w-md">
            <h1 className="md:mb-5 md:text-3xl lg:text-5xl text-2xl font-bold">
              Sustainable Serenity
            </h1>
            <p className="hidden md:block">
              Enjoy the harmony of eco-friendly design and modern luxury in a
              peaceful setting. Embrace a lifestyle that cares for you and the
              environment.
            </p>
          </div>
        </div>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a
            href="#slide2"
            className="btn btn-circle btn-ghost bg-slate-100 hover:bg-slate-100 hover:bg-opacity-10 bg-opacity-20"
          >
            ❮
          </a>
          <a
            href="#slide1"
            className="btn btn-circle btn-ghost bg-slate-100 hover:bg-slate-100 hover:bg-opacity-10 bg-opacity-20"
          >
            ❯
          </a>
        </div>
      </div>
    </div>
  );
};

export default Slider;
