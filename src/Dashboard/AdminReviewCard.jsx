import Swal from "sweetalert2";
import useAdminAllReviews from "../Hooks/useAdminAllReviews";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const AdminReviewCard = ({ review }) => {
  const axiosSecure = useAxiosSecure();
  const [reviews, refetch, isPending] = useAdminAllReviews();
  const {
    reviewerImage,
    reviewerEmail,
    reviewerName,
    reviewDescription,
    propertyTitle,
    reviewId,
  } = review;
  const handleDelete = (reviewId) => {
    axiosSecure.delete(`/admin/delete-review/${reviewId}`).then((res) => {
      //   console.log(res);
      refetch();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "review deleted",
        showConfirmButton: false,
        timer: 1500,
      });
    });
  };

  return (
    <div className="card  hover:scale-[1.01] duration-300 rounded-3xl bg-base-100 border-[1px] shadow-sm p-4">
      <div className="lg:flex justify-between items-center border-b-2 pb-4">
        <div className="flex mb-6 lg:mb-0 gap-3 items-center ">
          <div className=" w-14">
            <img
              className="overflow-hidden  rounded-full max-w-full "
              src={reviewerImage}
              alt=""
            />
          </div>
          <div>
            <div className="font-semibold">{reviewerName}</div>
            <di className="text-stone-500">Email : {reviewerEmail}</di>
          </div>
        </div>
        <div className="font-semibold">
          <div className="text-stone-500">Property Title :</div>
          <div>{propertyTitle}</div>
        </div>
      </div>
      <div className="text-neutral-500 p-4">{reviewDescription}</div>
      <div>
        <button
          onClick={() => handleDelete(reviewId)}
          className="btn rounded-3xl bg-orange-600 text-white"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default AdminReviewCard;
