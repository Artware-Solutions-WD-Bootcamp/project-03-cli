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

// GET all charities fund movements
const getAllCharityMovementsService = () => {
  return service.get("/");
};

// GET charity's details based on it's ID
const getCharityMovementDetailsService = (id) => {
  return service.get(`/${id}`);
};

// CREATE a new charity movement
const postCharityMovementService = (newCharityMovement) => {
  return service.post("/", newCharityMovement);
};

// UPDATE existing charity movement based on it's ID
const patchCharityMovementService = (id, patchedCharityMovement) => {
  return service.patch(`/${id}`, patchedCharityMovement)
}

// DELETE existing charity movement based on it's ID
const deleteCharityMovementService = (id) => {
  return service.delete(`/${id}`);
};
export {
  getAllCharityMovementsService,
  getCharityMovementDetailsService,
  postCharityMovementService,
  patchCharityMovementService,
  deleteCharityMovementService,
};
