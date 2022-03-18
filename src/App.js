import "./App.css";
import { Route, Routes } from "react-router-dom";

import NavBar from "../src/components/Navbar.jsx";

import Home from "./pages/Home";
import Error from "./pages/Error";
import NotFound from "./pages/NotFound";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import UsersList from "./pages/users/UsersList";
import UserDetails from "./pages/users/UserDetails";
import UserEdit from "./pages/users/UserEdit";
import UserDelete from "./pages/users/UserDelete";
import { useState, useContext } from "react";
import { ThemeContext } from "./context/theme.context";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { switchTheme } = useContext(ThemeContext);

  return (
    <div className="App" style={switchTheme()}>
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/users" element={<UsersList />} />
        <Route path="/users/details/:id" element={<UserDetails />} />
        <Route path="/users/edit/:id" element={<UserEdit />} />
        <Route path="/users/delete/:id" element={<UserDelete />} />

        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />

        <Route path="/error" element={<Error />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
