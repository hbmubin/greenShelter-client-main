import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import { useForm } from "react-hook-form";

const Register = () => {
  const { createUser } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    createUser(data.email, data.password).then((result) => {
      const user = result.user;
      console.log(user);
    });
  };

  return (
    <div className="py-[15vh] bg-gray-100 w-full">
      <div className="card-body w-[700px] mx-auto mt-10 bg-base-100 rounded-3xl ">
        <div className="text-center text-4xl font-semibold py-4">
          Register Now
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Name"
              className="input input-bordered rounded-3xl "
            />
            {errors.name && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <input
              type="text"
              {...register("photo", { required: true })}
              placeholder="Photo URL"
              className="input input-bordered rounded-3xl "
            />
            {errors.photo && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Email"
              className="input input-bordered rounded-3xl "
            />
            {errors.email && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 20,
                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
              })}
              placeholder="Password"
              className="input input-bordered rounded-3xl"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-600">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-600">Password must be 6 characters</p>
            )}
            {errors.password?.type === "maxLength" && (
              <p className="text-red-600">
                Password must be less than 20 characters
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-600">
                Password must have one Uppercase one lower case, one number and
                one special character.
              </p>
            )}
          </div>
          <div className="form-control mt-6">
            <input
              type="submit"
              className="btn bg-orange-400 rounded-3xl text-white"
              value="Register"
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
            Already have an account?
            <Link to="/Login" className="text-orange-400 ml-1 underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
