// here we will store all our auth routes
import axios from "axios";

//
const service = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/auth`,
});

// send Token on each request
service.interceptors.request.use((config) => {
  // look for Token on localStorage
  const storedToken = localStorage.getItem("authToken");

  // if exists, add Token to request's headers
  config.headers = storedToken && { Authorization: `Bearer ${storedToken}` };
  return config;
});

const registerService = (user) => {
  return service.post("/register", user);
};

const loginService = (user) => {
  return service.post("/login", user);
};

export { registerService, loginService };
