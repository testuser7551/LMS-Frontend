import { postRequest } from "./api";

// Register
export const registerUser = async ({ name, email, password, role }) => {
  const data = await postRequest("/api/auth/register", {
    name,
    email,
    password,
    role,
  });

  if (data.token) {
    localStorage.setItem("token", data.token);
  }

  return data.user;
};

// Login
export const loginUser = async (email, password) => {
  const data = await postRequest("/api/auth/login", { email, password });

  if (data.token) {
    localStorage.setItem("token", data.token);
  }

  return data.user;
};

// Logout
export const logoutUser = async () => {
  localStorage.removeItem("token");
  try {
    await postRequest("/api/auth/logout"); // optional
  } catch {
    // ignore
  }
};
