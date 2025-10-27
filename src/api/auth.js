import {getRequest, postRequest, putRequest } from "./api";
import api from "./api"
// Register
// export const registerUser = async ({ schoolId,schoolObjectId , name, email, password, role }) => {
//   const data = await postRequest("/api/auth/register", {
//     schoolId,
//     schoolObjectId ,
//     name,
//     email,
//     password,
//     role,
//   });

//   if (data.token) {
//     localStorage.setItem("token", data.token);
//   }

//   return data.user;
// };
export const registerUser = async (formData) => {
  
      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
  const res = await api.post("/api/auth/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  // if (data.token) {
  //   localStorage.setItem("token", data.token);
  // }
  return res.data.user;
};

// Login
export const loginUser = async (email, password) => {
  const data = await postRequest("/api/auth/login", { email, password });

  if (data.token) {
    localStorage.setItem("token", data.token);
  }

  return data.user;
};

// getCurrent user
export const getCurrentUser = async () => {
  const data = await getRequest("/api/auth/user");
  return data;
};


// getuser by schoolId
export const getUsersBySchoolAPI = async (schoolId) => {
  const data = await getRequest(`/api/auth/school/${schoolId}`);
  return data;
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



export const updateUserProfile = async ({ name, email, password, oldPassword, avatarFile }) => {
  const formData = new FormData();
  if (name) formData.append("name", name);
  if (email) formData.append("email", email);   // ✅ add this
  if (oldPassword) formData.append("oldPassword", oldPassword); // ✅ add this
  if (password) formData.append("password", password);
  if (avatarFile) formData.append("avatar", avatarFile);

  const data = await putRequest("/api/auth/profile", formData, {
    "Content-Type": "multipart/form-data", // axios will handle boundary
  });

  return data.user;
};



export const updateUser = async ({ userId, fname, lname, email, password, avatarFile, role, designation }) => {
  const formData = new FormData();

  if (fname) formData.append("fname", fname);
  if (lname) formData.append("lname", lname);
  if (email) formData.append("email", email);
  if (password) formData.append("password", password);
  if (role) formData.append("role", role);
  if (designation) formData.append("designation", designation);
  if (avatarFile) formData.append("avatar", avatarFile);

  const data = await putRequest(`/api/auth/${userId}`, formData, {
    "Content-Type": "multipart/form-data",
  });

  return data.user;
};






// Get platform statistics
export const getPlatformStatsAPI = async () => {
  const data = await getRequest("/api/auth/stats");
  return data;
};
