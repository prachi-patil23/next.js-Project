const API_URL = "http://localhost:3001";

export const login = async (
  email: string,
  password: string
) => {
  const response = await fetch("/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Invalid email or password"
    );
  }

  return data;
};

export const checkUserByEmail = async (
  email: string
) => {
  const response = await fetch(
    `${API_URL}/users?email=${encodeURIComponent(
      email
    )}`
  );

  if (!response.ok) {
    throw new Error(
      "Unable to connect to server"
    );
  }

  return response.json();
};

export const signup = async (user: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  const response = await fetch(
    `${API_URL}/users`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Registration failed"
    );
  }

  return response.json();
};