import { useNavigate, useRouteError } from "react-router-dom";
import { ImSad } from "react-icons/im";
import { PiListMagnifyingGlassFill } from "react-icons/pi";

const ErrorPage = () => {
  const navigate = useNavigate();
  const error = useRouteError();

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center flex items-center flex-col">
        <div className="text-stone-600">
          <PiListMagnifyingGlassFill size={120} />
        </div>
        <div className="text-4xl font-bold text-orange-600 mb-6 mt-2">
          Opps...
        </div>
        <h1 className=" mb-4 text-6xl text-gray-600 font-semibold">
          {error.status}
        </h1>
        <h2 className="text-4xl text-gray-600 ">
          {error.statusText || error.message}
        </h2>
        <div className="mt-6 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="btn rounded-3xl font-semibold bg-orange-400 text-white "
          >
            Go Back
          </button>
          or
          <button
            onClick={() => navigate("/")}
            className="btn rounded-3xl font-semibold bg-orange-400 text-white "
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
