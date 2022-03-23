//DO import needed modules
import { useState, useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ThemeContext } from "./context/theme.context";
import { verifyService } from "./services/auth.services";

//DO import navbar
import NavBar from "../src/components/Navbar.jsx";

//DO import generic related pages
import Home from "./pages/Home";
import Error from "./pages/Error";
import NotFound from "./pages/NotFound";

//DO import auth related pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

//DO import Charitable Causes related pages
import Causes from "./pages/Causes";

//DO import Collaborator related pages
import Collabs from "./pages/Collabs";

//DO import User related pages
import Users from "./pages/Users";

//DO import stylesheets
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { switchTheme } = useContext(ThemeContext);

  useEffect(() => {
    verifyUser();
  }, []);

  const verifyUser = async () => {
    // connect to server and validate token
    try {
      await verifyService();

      // change isLoggedIn state to true
      setIsLoggedIn(true);
    } catch (err) {
      // in case some error occured with token validation, set isLoggedIn state to false
      setIsLoggedIn(false);
    }
  };

  return (
    <div className="App" style={switchTheme()}>
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      <Routes>
        <Route path="/" element={<Home setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/causes" element={<Causes setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/collabs" element={<Collabs setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/users" element={<Users setIsLoggedIn={setIsLoggedIn} />} />

        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />

        <Route path="/error" element={<Error setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="*" element={<NotFound setIsLoggedIn={setIsLoggedIn} />} />
      </Routes>
    </div>
  );
}

export default App;
