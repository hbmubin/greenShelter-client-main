import { useContext, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AgentUpdateProperty = () => {
  const { user, loading } = useContext(AuthContext);
  const property = useLoaderData();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const [imageUrl, setImageUrl] = useState("");

  const handleUpdateProperty = async (event) => {
    event.preventDefault();
    const form = event.target;
    const photo = form?.photo?.files[0];
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
    // console.log(photo);

    if (photo) {
      const response = await axiosPublic.post(image_hosting_api, formData);
      setImageUrl(response.data.data.url);
    }
    // console.log(imageUrl);

    const propertyId = property._id;
    const updatedFields = {
      propertyTitle: form.propertyTitle.value,
      propertyLocation: form.location.value,
      propertyDescriptions: form.description.value,
      priceRange: [priceFrom, priceTo],
    };
    if (imageUrl) {
      updatedFields.propertyImage = imageUrl;
    }

    const updateRes = await axiosSecure.patch(
      `/property/${propertyId}`,
      updatedFields
    );
    console.log(updateRes.data);

    if (updateRes.data.modifiedCount > 0) {
      event.target.reset();
      setImageUrl("");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Updated Successful",
        showConfirmButton: false,
        timer: 1500,
      });
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
        <h1>Update Property</h1>
      </div>
      <div className="flex items-center justify-center">
        <form
          onSubmit={handleUpdateProperty}
          className="flex gap-4 flex-col p-10 bg-white rounded-3xl shadow-2xl"
        >
          <div className="">
            <input
              className="input w-full border-[1px] border-gray-300 rounded-3xl bg-gray-200"
              type="text"
              name="propertyTitle"
              defaultValue={property.propertyTitle}
              required
            />
          </div>
          <div className="flex gap-4">
            <div className="">
              <input
                className="input border-[1px] border-gray-300 rounded-3xl bg-gray-200"
                type="text"
                name="location"
                defaultValue={property.propertyLocation}
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
                  defaultValue={property.priceRange[0]}
                  required
                />
              </div>
              <div>
                <input
                  className="input w-24 border-[1px] border-gray-300 rounded-3xl bg-gray-200"
                  type="number"
                  name="to"
                  defaultValue={property.priceRange[1]}
                  required
                />
              </div>
            </div>
          </div>
          <div className="flex gap-4">
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
              defaultValue={property.propertyDescriptions}
              required
            ></textarea>
          </div>
          <div className="flex gap-4">
            <div className="w-full">
              <input
                className="file-input w-full border-[1px] border-gray-300 rounded-3xl bg-gray-200"
                type="file"
                name="photo"
              />
            </div>
            <div className="w-full">
              <input
                className="input w-full border-[1px] font-semibold rounded-3xl text-white bg-orange-400"
                type="submit"
                value="Update Property"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgentUpdateProperty;
