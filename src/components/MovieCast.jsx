import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/accounts/movies/${id}/`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch movie data");
        }
        return res.json();
      })
      .then((data) => {
        setMovie(data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [id]);

  if (error) return <p className="text-red-500 text-center mt-4">{error}</p>;
  if (!movie) return <p className="text-center mt-4">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Cast Section */}
      <h2 className="text-2xl font-bold mb-4">Cast</h2>
      {movie.cast && movie.cast.length > 0 ? (
        <ul className="space-y-4">
          {movie.cast.map((member) => (
            <li key={member.id} className="flex items-center space-x-4 border-b pb-4">
              <img
                src={member.image_url}
                alt={member.actor}
                className="w-12 h-12 object-cover rounded"
              />
              <div>
                <p className="font-semibold text-lg">{member.actor}</p>
                <p className="text-gray-600">as {member.role}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No cast data available.</p>
      )}
    </div>
  );
};

export default MovieDetails;
