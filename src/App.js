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
import CausesList from "./pages/charity/CausesList";
//import CauseDetails from "./pages/charity/CauseDetails";
//import CauseAdd from "./pages/charity/CauseAdd";
//import CauseEdit from "./pages/charity/CauseEdit";
//import CauseDelete from "./pages/charity/CauseDelete";

//DO import Collaborator related pages
import CollabAdd from "./pages/collaborators/CollabAdd";
import CollabsList from "./pages/collaborators/CollabsList";
import CollabDetails from "./pages/collaborators/CollabDetails";
import CollabEdit from "./pages/collaborators/CollabEdit";
import CollabDelete from "./pages/collaborators/CollabDelete";

//DO import User related pages
import UserAdd from "./pages/users/UserAdd";
import UsersList from "./pages/users/UsersList";
import UserDetails from "./pages/users/UserDetails";
import UserEdit from "./pages/users/UserEdit";
import UserDelete from "./pages/users/UserDelete";

//DO import stylesheets
import "./App.css";

function App() {
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);

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
        <Route path="/" element={<Home />} />

        <Route path="/causes" element={<CausesList />} />
        {/* <Route path="/causes/add" element={<CauseAdd />} /> */}
        {/* <Route path="/causes/details/:id" element={<CauseDetails />} /> */}
        {/* <Route path="/causes/edit/:id" element={<CauseEdit />} /> */}
        {/* <Route path="/causes/delete/:id" element={<CauseDelete />} /> */}

        <Route path="/collabs" element={<CollabsList />} />
        <Route path="/collabs/add" element={<CollabAdd />} />
        <Route path="/collabs/details/:id" element={<CollabDetails />} />
        <Route path="/collabs/edit/:id" element={<CollabEdit />} />
        <Route path="/collabs/delete/:id" element={<CollabDelete />} />

        <Route path="/users" element={<UsersList />} />
        <Route path="/users/add" element={<UserAdd />} />
        <Route path="/users/details/:id" element={<UserDetails />} />
        <Route path="/users/edit/:id" element={<UserEdit />} />
        <Route path="/users/delete/:id" element={<UserDelete />} />

        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/register" element={<Register />} />

        <Route path="/error" element={<Error />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
