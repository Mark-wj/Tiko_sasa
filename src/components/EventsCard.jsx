const EventsCard = ({ title, venue, date, price, image }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden h-full flex flex-col">
      <div className="relative aspect-square">
        <img
          className="w-full h-full object-cover"
          src={image}
          alt={title}
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <p className="text-white text-sm font-medium">{date}</p>
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 flex-1">{venue}</p>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Starting from</p>
            <p className="text-2xl font-bold text-indigo-600">KES {price}</p>
          </div>
          <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-full transition-colors">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventsCard;