import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AgentAddProperty = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const handleAddProperty = async (event) => {
    event.preventDefault();
    const form = event.target;
    const photo = form.photo.files[0];
    const priceFrom = parseInt(form.from.value);
    const priceTo = parseInt(form.to.value);

    if (priceFrom > priceTo) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Price Range invalid",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    const formData = new FormData();
    formData.append("image", photo);

    const response = await axiosPublic.post(image_hosting_api, formData);
    const imageUrl = response.data.data.url;
    // console.log(response.data.success);

    if (response.data.success) {
      const propertyImage = imageUrl;
      const propertyTitle = form.propertyTitle.value;
      const propertyLocation = form.location.value;
      const propertyDescriptions = form.description.value;
      const agentName = user.displayName;
      const agentEmail = user.email;
      const agentImage = user.photoURL;
      const priceRange = [priceFrom, priceTo];
      const advertised = false;
      const propertyStatus = "pending";
      const property = {
        propertyImage,
        propertyTitle,
        propertyLocation,
        propertyDescriptions,
        agentName,
        agentEmail,
        agentImage,
        priceRange,
        advertised,
        propertyStatus,
      };
      // console.log(property);
      const addRes = await axiosSecure.post("/property", property);
      // console.log(addRes.data);
      if (addRes.data.insertedId) {
        event.target.reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Added Successful",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="flex w-full min-h-screen items-center justify-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="text-center py-14 text-3xl font-semibold">
        <h1>Add New Property</h1>
      </div>
      <div className="flex items-center justify-center">
        <form
          onSubmit={handleAddProperty}
          className="flex gap-4 flex-col p-10 bg-white rounded-3xl shadow-2xl"
        >
          <div className="">
            <input
              className="input w-full border-[1px] border-gray-300 rounded-3xl bg-gray-200"
              type="text"
              name="propertyTitle"
              placeholder="Property title"
              required
            />
          </div>
          <div className="flex gap-4 md:flex-row flex-col">
            <div className="">
              <input
                className="input w-full border-[1px] border-gray-300 rounded-3xl bg-gray-200"
                type="text"
                name="location"
                placeholder="Location"
                required
              />
            </div>
            <div className="flex gap-4 items-center">
              <div className="font-semibold">Price Range :</div>
              <div>
                <input
                  className="input w-24 border-[1px] border-gray-300 rounded-3xl bg-gray-200"
                  type="number"
                  name="from"
                  placeholder="From"
                  required
                />
              </div>
              <div>
                <input
                  className="input w-24 border-[1px] border-gray-300 rounded-3xl bg-gray-200"
                  type="number"
                  name="to"
                  placeholder="To"
                  required
                />
              </div>
            </div>
          </div>
          <div className="flex gap-4 md:flex-row flex-col">
            <div className="w-full">
              <input
                className="input w-full border-[1px] border-gray-300 rounded-3xl bg-gray-200"
                type="text"
                value={user.displayName}
                readOnly
              />
            </div>
            <div className="w-full">
              <input
                className="input w-full border-[1px] border-gray-300 rounded-3xl bg-gray-200"
                type="email"
                value={user.email}
                readOnly
              />
            </div>
          </div>
          <div className="w-full">
            <textarea
              name="description"
              className="textarea w-full border-[1px] border-gray-300 rounded-3xl bg-gray-200"
              placeholder="Property Description"
              required
            ></textarea>
          </div>
          <div className="flex gap-4  md:flex-row flex-col">
            <div className="w-full">
              <input
                className="file-input w-full border-[1px] border-gray-300 rounded-3xl bg-gray-200"
                type="file"
                name="photo"
                required
              />
            </div>
            <div className="w-full">
              <input
                className="btn input w-full border-[1px] font-semibold rounded-3xl text-white bg-orange-400"
                type="submit"
                value="Add Property"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgentAddProperty;
