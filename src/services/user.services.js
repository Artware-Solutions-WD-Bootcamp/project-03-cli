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

const getAllUsersService = () => {
  return service.get("/");
};

const getUserDetailsService = (id) => {
  return service.get(`/${id}`);
};

const addNewUserService = (newUser) => {
  return service.post("/", newUser);
};  

const updateUserService = (id, updatedUser) => {
  return service.patch(`/${id}`, updatedUser)
}

const deleteUserService = (id) => {
  return service.delete(`/${id}`);
};
export {
  getAllUsersService,
  getUserDetailsService,
  addNewUserService,
  updateUserService,
  deleteUserService,
};
