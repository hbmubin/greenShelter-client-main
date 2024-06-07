const ReviewCard = ({ review }) => {
  return (
    <div className="flex flex-col w-full p-6 mx-auto divide-y rounded-3xl dark:divide-gray-300 dark:bg-gray-50 dark:text-gray-800">
      <div className="flex justify-between p-4">
        <div className="flex space-x-4">
          <div>
            <img
              src="https://source.unsplash.com/100x100/?portrait"
              alt=""
              className="object-cover w-12 h-12 rounded-full dark:bg-gray-500"
            />
          </div>
          <div>
            <h4 className="font-bold">{review.reviewerName}</h4>
            <span className="text-xs dark:text-gray-600">
              {review.propertyTitle}
            </span>
          </div>
        </div>
      </div>
      <div className="p-4 space-y-2 text-sm dark:text-gray-600">
        <p>{review.reviewDescription}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
