import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";

const Login = () => {
  const { loginUser } = useContext(AuthContext);

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    loginUser(email, password).then((result) => {
      const user = result.user;
      console.log(user);
    });
  };

  return (
    <div className="py-[15vh] bg-gray-100 w-full">
      <div className="card-body w-[700px] mx-auto mt-10 bg-base-100 rounded-3xl ">
        <div className="text-center text-4xl font-semibold py-4">Login Now</div>
        <form onSubmit={handleLogin}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered rounded-3xl "
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input input-bordered rounded-3xl "
              required
            />
          </div>
          <div className="form-control mt-6">
            <input
              type="submit"
              className="btn bg-orange-400 rounded-3xl text-white"
              value="Login"
            />
          </div>
        </form>
        <hr className="my-4" />
        <div className="text-center text-xl">
          <div className="text-neutral-600">or</div>
          <div className="flex cursor-pointer justify-center w-full border-2 hover:text-orange-400 hover:border-orange-400 duration-300 rounded-3xl py-2 my-2">
            <div className="flex gap-2 items-center">
              <FcGoogle></FcGoogle> <span>Google</span>
            </div>
          </div>
          <div>
            Do not have an account?
            <Link to="/register" className="text-orange-400 ml-1 underline">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
