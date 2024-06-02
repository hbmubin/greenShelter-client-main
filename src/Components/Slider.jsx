const Slider = () => {
  return (
    <div className="carousel relative max-h-[90vh] w-full">
      <div id="slide1" className="carousel-item relative w-full">
        <img
          src="../../src/assets/hero-real-estate-facts-trends.jpeg"
          className="w-full"
        />
        <div className="absolute bg-black h-full w-full bg-opacity-50"></div>
        <div className="absolute text-center top-1/2 left-1/2 -translate-x-1/2 text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
            <p className="mb-5">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button className="btn btn-primary">Get Started</button>
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
        <img src="../../src/assets/house-2511060_1280.jpg" className="w-full" />
        <div className="absolute bg-black h-full w-full bg-opacity-50"></div>
        <div className="absolute text-center top-1/2 left-1/2 -translate-x-1/2 text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
            <p className="mb-5">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button className="btn btn-primary">Get Started</button>
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
        <img
          src="../../src/assets/pexels-binyaminmellish-106399.jpg"
          className="w-full"
        />
        <div className="absolute bg-black h-full w-full bg-opacity-50"></div>
        <div className="absolute text-center top-1/2 left-1/2 -translate-x-1/2 text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
            <p className="mb-5">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button className="btn btn-primary">Get Started</button>
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
