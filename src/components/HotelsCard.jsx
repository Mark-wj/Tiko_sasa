const HotelsCard = ({ name, address, price, rating, image }) => {
  // A helper function to render stars based on the rating (assumed to be an integer from 0 to 5)
  const renderStars = () => {
    const stars = [];
    // Loop 5 times to create five stars
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        // Filled star for ratings less than or equal to the rating value
        stars.push(
          <span key={i} className="text-yellow-500 text-lg">
            &#9733;
          </span>
        );
      } else {
        // Unfilled star for the remainder
        stars.push(
          <span key={i} className="text-gray-300 text-lg">
            &#9733;
          </span>
        );
      }
    }
    return stars;
  };

  return (
    <div className="transform transition duration-300 hover:scale-105">
      <a
        href="#"
        className="group block w-80 h-96 bg-white shadow-lg overflow-hidden 
                   rounded-tl-none rounded-tr-3xl rounded-bl-3xl rounded-br-none"
      >
        {/* Image Section */}
        <div className="w-full h-2/3">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        {/* Details Section */}
        <div className="p-4 h-1/3 flex flex-col justify-between group-hover:shadow-black">
          <div>
            <h3 className="text-gray-900 group-hover:underline group-hover:underline-offset-4">
              {name}
            </h3>
            <p className="mt-1.5 text-pretty text-xs text-gray-500">
              {address}
            </p>
            {/* Render the stars here */}
            <div className="mt-1.5">
              {renderStars()}
            </div>
          </div>
          <p className="text-gray-900">KES: {price}</p>
        </div>
      </a>
    </div>
  );
};

export default HotelsCard;
