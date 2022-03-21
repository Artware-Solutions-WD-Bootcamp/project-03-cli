//DO import needed modules
import axios from "axios";

// here we will store all our frontend charity causes routes

const service = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/causes`,
});

// send Token on each request
service.interceptors.request.use((config) => {
  // look for Token on localStorage
  const storedToken = localStorage.getItem("authToken");

  // if exists, add Token to request's headers
  config.headers = storedToken && { Authorization: `Bearer ${storedToken}` };
  return config;
});

const getAllCausesService = () => {
  return service.get("/");
};

const addNewCauseService = (newCause) => {
  return service.post("/", newCause);
};

const getCauseDetailsService = (id) => {
  return service.get(`/${id}`);
};

const updateCauseService = (id, updatedCause) => {
  return service.patch(`/${id}`, updatedCause)
}

const deleteCauseService = (id) => {
  return service.delete(`/${id}`);
};
export {
  getAllCausesService,
  addNewCauseService,
  getCauseDetailsService,
  updateCauseService,
  deleteCauseService,
};
