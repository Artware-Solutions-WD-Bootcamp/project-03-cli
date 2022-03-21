//DO import needed modules
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/theme.context.js";
import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShuffle, faRightToBracket, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";

function NavBar(props) {
  const { isLoggedIn, setIsLoggedIn } = props;
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  const navigate = useNavigate();

  const handleLogOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <React.Fragment>
      <AppBar position="static" color="primary" enableColorOnDark>
        <Toolbar>

          { <Link to="/" variant="body2" color="inherit">Home</Link> }
          &nbsp;&nbsp;

          { <Link to="/causes" variant="body2" color="inherit">Carity Causes</Link> }
          &nbsp;&nbsp;
          
          { <Link to="/collabs" variant="body2" color="inherit">Collaborators</Link> }
          &nbsp;&nbsp;

          {isLoggedIn && ( <Link to="/users" variant="body2" color="inherit"> Users </Link> )}
          &nbsp;&nbsp;

          <Typography sx={{ flexGrow: 1 }}></Typography>
          
          {!isLoggedIn && ( <Link to="/register" variant="body2" color="inherit">Register</Link> )}
          &nbsp;&nbsp;
          {!isLoggedIn && ( <Link to="/login" variant="body2" color="inherit"> <FontAwesomeIcon icon={faRightToBracket} color={"white"} /> </Link> )}
          &nbsp;&nbsp;
          {isLoggedIn && (
            <Button color="inherit" onClick={handleLogOut} style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}>
              <FontAwesomeIcon icon={faRightFromBracket} color={"white"} />
            </Button>
          )}
          &nbsp;&nbsp;
          {
            <Button color="inherit" onClick={() => setDarkMode(!darkMode)} style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}>
              <FontAwesomeIcon icon={faShuffle} color={"white"} />
            </Button>
          }
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default NavBar;
