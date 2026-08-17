const API_URL = "http://localhost:3001";

export const getTheatres = async () => {
  const response = await fetch(
    `${API_URL}/theatres`
  );

  if (!response.ok) {
    throw new Error(
      "Unable to fetch theatres"
    );
  }

  return response.json();
};