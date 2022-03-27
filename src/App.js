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

//DO import Charity related pages
import Charity from "./pages/Charity";
import CharityElection from "./pages/CharityElection";

//DO import Collaborator related pages
import Collab from "./pages/Collab";

//DO import User related pages
import User from "./pages/User";

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
    <div className="App container" style={switchTheme()}>
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      <Routes>
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/charity" element={<Charity isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/charity-election" element={<CharityElection isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/collab" element={<Collab isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/user" element={<User isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />

        <Route path="/login" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />

        <Route path="/error" element={<Error isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="*" element={<NotFound isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
      </Routes>
    </div>
  );
}

export default App;
