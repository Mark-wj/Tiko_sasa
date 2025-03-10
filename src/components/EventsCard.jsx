const EventsCard = ({ title, venue, date, price, image }) => {
    return (
      <div className="bg-white rounded-lg overflow-hidden shadow-lg ring-4 ring-red-500 ring-opacity-40 hover:ring-rose-500 w-[100%] h-[100%] flex flex-col">
        {/* Image container now takes up ~66% of card height */}
        <div className="relative h-[78%]">
          <img
            className="w-full h-full object-cover"
            src={image}
            alt={title}
          />
          <div className="absolute top-0 right-0 bg-rose-300 text-white px-2 py-1 m-2 rounded-md text-sm font-medium">
            <p className="text-gray-600 text-sm">{date}</p>
          </div>
        </div>
        {/* Details section takes the remaining ~34% */}
        <div className="p-4 h-[24%] flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-medium mb-2 mt-[-4%]">{title}</h3>
            <p className="text-gray-600 text-sm mt-[-4%]">{venue}</p>
          </div>
          <div className="flex items-center justify-between mt-[-1%]">
            <span className="font-bold text-lg">KES: {price}</span>
            <button className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-2 px-4 rounded">
              Buy Tickets
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default EventsCard;
  