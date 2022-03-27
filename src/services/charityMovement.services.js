//DO import needed modules
import axios from "axios";

// here we will store all our frontend charity routes

const service = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/charity-movement`,
});

// send Token on each request
service.interceptors.request.use((config) => {
  // look for Token on localStorage
  const storedToken = localStorage.getItem("authToken");

  // if exists, add Token to request's headers
  config.headers = storedToken && { Authorization: `Bearer ${storedToken}` };
  return config;
});

const getAllCyarityMovementsService = () => {
  return service.get("/");
};

const addNewCyarityMovementService = (newCharityMovement) => {
  return service.post("/", newCharityMovement);
};

const getCyarityMovementDetailsService = (id) => {
  return service.get(`/${id}`);
};

const updateCyarityMovementService = (id, updatedCharityMovement) => {
  return service.patch(`/${id}`, updatedCharityMovement)
}

const deleteCyarityMovementService = (id) => {
  return service.delete(`/${id}`);
};
export {
  getAllCyarityMovementsService,
  addNewCyarityMovementService,
  getCyarityMovementDetailsService,
  updateCyarityMovementService,
  deleteCyarityMovementService,
};
