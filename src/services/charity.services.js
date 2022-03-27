//DO import needed modules
import axios from "axios";

// here we will store all our frontend charity routes

const service = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/charity`,
});

// send Token on each request
service.interceptors.request.use((config) => {
  // look for Token on localStorage
  const storedToken = localStorage.getItem("authToken");

  // if exists, add Token to request's headers
  config.headers = storedToken && { Authorization: `Bearer ${storedToken}` };
  return config;
});

// GET all charities
const getAllCharitiesService = () => {
  return service.get("/");
};

// GET a charity details based on it's ID
const getCharityDetailsService = (id) => {
  return service.get(`/${id}`);
};

// CREATE a new charity
const postCharityService = (newCharity) => {
  return service.post("/", newCharity);
};

// UPDATE existing charity based on it's ID
const patchCharityService = (id, patchedCharity) => {
  return service.patch(`/${id}`, patchedCharity)
}

// DELETE existing charity based on it's ID
const deleteCharityService = (id) => {
  return service.delete(`/${id}`);
};
export {
  getAllCharitiesService,
  getCharityDetailsService,
  postCharityService,
  patchCharityService,
  deleteCharityService,
};
