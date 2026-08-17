const API_URL = "http://localhost:3001";

export const getMovies = async () => {
  const response = await fetch(
    `${API_URL}/movies`
  );

  if (!response.ok) {
    throw new Error("Unable to fetch movies");
  }

  return response.json();
};

export const getMovieById = async (
  id: string
) => {
  const response = await fetch(
    `${API_URL}/movies/${id}`
  );

  if (!response.ok) {
    throw new Error("Unable to fetch movie");
  }

  return response.json();
};