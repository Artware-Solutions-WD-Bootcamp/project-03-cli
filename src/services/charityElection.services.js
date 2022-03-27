//DO import needed modules
import axios from "axios";

// here we will store all our frontend charitable user elections routes

const service = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/charity-election`,
});

// send Token on each request
service.interceptors.request.use((config) => {
  // look for Token on localStorage
  const storedToken = localStorage.getItem("authToken");

  // if exists, add Token to request's headers
  config.headers = storedToken && { Authorization: `Bearer ${storedToken}` };
  return config;
});

const getAllCharityElectionsService = () => {
  return service.get("/");
};

const getCharityElectionDetailsService = (id) => {
  return service.get(`/${id}`);
};

const postCharityElectionService = (newCharityElection) => {
  return service.post("/", newCharityElection);
};

const patchCharityElectionService = (id, patchedCharityElection) => {
  return service.patch(`/${id}`, patchedCharityElection)
}

const deleteCharityElectionService = (id) => {
  return service.delete(`/${id}`);
};
export {
  getAllCharityElectionsService,
  getCharityElectionDetailsService,
  postCharityElectionService,
  patchCharityElectionService,
  deleteCharityElectionService,
};
