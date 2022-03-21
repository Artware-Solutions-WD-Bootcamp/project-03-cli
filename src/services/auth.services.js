//DO import needed modules
import axios from "axios";

// here we will store all our frontend auth routes

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

// new user creation service
const registerService = (user) => {
  return service.post("/register", user);
};

// existing user login service
const loginService = (user) => {
  return service.post("/login", user);
};

// verify service to avoid login each time user turn back or render update page
const verifyService = () => {
  return service.get("/verify")
}

export { registerService, loginService, verifyService };
