import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import { useForm } from "react-hook-form";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";

const Register = () => {
  const { createUser, googleLogin } = useContext(AuthContext);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    createUser(data.email, data.password).then((result) => {
      const userInfo = {
        name: data.name,
        email: data.email,
        photoURL: data.photo,
        role: "user",
      };
      console.log(userInfo);
      fetch(`http://localhost:5000/users/${userInfo.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      })
        .then((res) => res.json())
        .then((data) => {
          navigate("/");
          reset();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Registration successful",
            showConfirmButton: false,
            timer: 1500,
          });
        });

      updateProfile(result.user, {
        displayName: data.name,
        photoURL: data.photo,
      }).catch((error) => console.log(error));
    });
  };

  const handleGoogleLogin = () => {
    googleLogin().then((result) => {
      const userInfo = {
        email: result.user.email,
        name: result.user.displayName,
        photoURL: result.user.photoURL,
        role: "user",
      };
      console.log(userInfo);
      fetch(`http://localhost:5000/users/${userInfo.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          navigate("/");
          reset();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Registration successful",
            showConfirmButton: false,
            timer: 1500,
          });
        });
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
            <div
              onClick={handleGoogleLogin}
              className="flex gap-2 items-center"
            >
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
