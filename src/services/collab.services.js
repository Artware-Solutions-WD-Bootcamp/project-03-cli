//DO import needed modules
import axios from "axios";

// here we will store all our frontend collaborators routes

const service = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/collabs`,
});

// send Token on each request
service.interceptors.request.use((config) => {
  // look for Token on localStorage
  const storedToken = localStorage.getItem("authToken");

  // if exists, add Token to request's headers
  config.headers = storedToken && { Authorization: `Bearer ${storedToken}` };
  return config;
});

const getAllCollabsService = () => {
  return service.get("/");
};

const addNewCollabService = (newCollab) => {
  return service.post("/", newCollab);
};

const getCollabDetailsService = (id) => {
  return service.get(`/${id}`);
};

const updateCollabService = (id, updatedCollab) => {
  return service.patch(`/${id}`, updatedCollab)
}

const deleteCollabService = (id) => {
  return service.delete(`/${id}`);
};
export {
  getAllCollabsService,
  addNewCollabService,
  getCollabDetailsService,
  updateCollabService,
  deleteCollabService,
};
