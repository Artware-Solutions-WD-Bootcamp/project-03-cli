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

const getAllCharitiesService = () => {
  return service.get("/");
};

const getCharityDetailsService = (id) => {
  return service.get(`/${id}`);
};

const postCharityService = (newCharity) => {
  return service.post("/", newCharity);
};

const patchCharityService = (id, patchedCharity) => {
  return service.patch(`/${id}`, patchedCharity)
}

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
