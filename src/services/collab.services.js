//DO import needed modules
import axios from "axios";

// here we will store all our frontend collaborators routes

const service = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/collab`,
});

// send Token on each request
service.interceptors.request.use((config) => {
  // look for Token on localStorage
  const storedToken = localStorage.getItem("authToken");

  // if exists, add Token to request's headers
  config.headers = storedToken && { Authorization: `Bearer ${storedToken}` };
  return config;
});

// GET all collaborators
const getAllCollabsService = () => {
  return service.get("/");
};

// GET collaborator's details based on it's ID
const getCollabDetailsService = (id) => {
  return service.get(`/${id}`);
};

// CREATE a new collaborator
const postCollabService = (newCollab) => {
  return service.post("/", newCollab);
};

// UPDATE existing collaborator based on it's ID
const patchCollabService = (id, patchedCollab) => {
  return service.patch(`/${id}`, patchedCollab)
}

// DELETE existing collaborator based on it's ID
const deleteCollabService = (id) => {
  return service.delete(`/${id}`);
};
export {
  getAllCollabsService,
  getCollabDetailsService,
  postCollabService,
  patchCollabService,
  deleteCollabService,
};
