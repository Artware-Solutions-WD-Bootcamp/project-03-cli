//DO import needed modules
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/theme.context.js";
import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShuffle, faRightToBracket, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { AppBar, Button, Toolbar, Tooltip, Typography } from "@mui/material";

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
      <AppBar position="static" enableColorOnDark={true} style={{ background: 'lightgray' }}>
        <Toolbar>

          { <Link to="/" variant="body2" color="inherit">Home</Link> }
          &nbsp;&nbsp;

          {isLoggedIn && ( <Link to="/user" variant="body2" color="inherit"> Users </Link> )}
          &nbsp;&nbsp;

          { <Link to="/collab" variant="body2" color="inherit">Collaborators</Link> }
          &nbsp;&nbsp;

          { <Link to="/charity" variant="body2" color="inherit">Charitable Causes</Link> }
          &nbsp;&nbsp;
          
          {isLoggedIn && ( <Link to="/charity-election" variant="body2" color="inherit"> Charity elections </Link> )}
          &nbsp;&nbsp;

          <Typography sx={{ flexGrow: 1 }}></Typography>
          
          {!isLoggedIn && ( <Link to="/register" variant="body2" color="inherit">Register</Link> )}
          &nbsp;&nbsp;
          {!isLoggedIn && (
            <Tooltip title="Login">
              <Link to="/login" variant="body2" color="inherit"> <FontAwesomeIcon icon={faRightToBracket} color={"white"} /> </Link>
            </Tooltip>
              )}
          &nbsp;&nbsp;
          {isLoggedIn && (
          <Tooltip title="Logout">
            <Button color="inherit" onClick={handleLogOut} style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}>
              <FontAwesomeIcon icon={faRightFromBracket} color={"white"} />
            </Button>
          </Tooltip>
          )}
          &nbsp;&nbsp;
          <Tooltip title="Change theme">
          {
            <Button color="inherit" onClick={() => setDarkMode(!darkMode)} style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}>
              <FontAwesomeIcon icon={faShuffle} color={"white"} />
            </Button>
          }
          </Tooltip>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default NavBar;
