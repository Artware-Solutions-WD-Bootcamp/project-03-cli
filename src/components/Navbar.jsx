import {NavLink} from "react-router-dom"
import {useNavigate} from "react-router-dom"
import { ThemeContext } from "../context/theme.context.js"
import { useContext } from 'react';

function NavBar(props) {
  const { isLoggedIn, setIsLoggedIn } = props
  //console.log("navbar isLoggedIn:", isLoggedIn);

  const { darkMode, setDarkMode } = useContext(ThemeContext)

  const navigate = useNavigate()

  const handleLogOut = () => {
    setIsLoggedIn(false)
    localStorage.removeItem("authToken")
    navigate("/")
  }
  
  return (
    <div>
      <NavLink to="/">Home</NavLink>&nbsp;&nbsp;
      {!isLoggedIn && <NavLink to="/register">Register</NavLink>}&nbsp;&nbsp;
      {!isLoggedIn && <NavLink to="/login">Login</NavLink>}&nbsp;&nbsp;
      {isLoggedIn && <button onClick={handleLogOut}>Logout</button>}&nbsp;&nbsp;
      <button onClick={() => setDarkMode(!darkMode)}>Change Theme</button>
    </div>
  )
}

export default NavBar