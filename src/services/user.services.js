//DO import needed modules
import axios from "axios";

// here we will store all our frontend user routes

const service = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/user`,
});

// send Token on each request
service.interceptors.request.use((config) => {
  // look for Token on localStorage
  const storedToken = localStorage.getItem("authToken");

  // if exists, add Token to request's headers
  config.headers = storedToken && { Authorization: `Bearer ${storedToken}` };
  return config;
});

// GET all users
const getAllUsersService = () => {
  return service.get("/");
};

// GET user's details based on it's ID
const getUserDetailsService = (id) => {
  return service.get(`/${id}`);
};

// CREATE a new user
const postUserService = (newUser) => {
  return service.post("/", newUser);
};  

// UPDATE existing user based on it's ID
const patchUserService = (id, patchedUser) => {
  return service.patch(`/${id}`, patchedUser)
}

// DELETE existing user based on it's ID
const deleteUserService = (id) => {
  return service.delete(`/${id}`);
};

export {
  getAllUsersService,
  getUserDetailsService,
  postUserService,
  patchUserService,
  deleteUserService,
};
