const PropertyReviews = ({ reviews }) => {
  return (
    <div className="bg-gray-100 px-6 mt-16 pb-10">
      <h2 className="text-2xl font-semibold py-6">
        Reviews {"("}
        {reviews.length}
        {")"}
      </h2>
      {reviews.map((review, idx) => (
        <div
          key={idx}
          className=" flex flex-col w-full  mx-auto mb-4 divide-y rounded-3xl dark:divide-gray-300 dark:bg-gray-50 dark:text-gray-800"
        >
          <div className="flex justify-between p-4">
            <div className="flex gap-4 items-center">
              <div>
                <img
                  src="https://source.unsplash.com/100x100/?portrait"
                  alt=""
                  className="object-cover w-12 h-12 rounded-full dark:bg-gray-500"
                />
              </div>
              <div>
                <h4 className="font-bold">{review.reviewerName}</h4>
              </div>
            </div>
          </div>
          <div className="p-4 space-y-2 text-sm dark:text-gray-600">
            {review.reviewDescription}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyReviews;
