//DO import needed modules
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from "../../services/auth.services";

function Login(props) {

  //DO set needed states
  const [username, setUsername] = useState("");
  const [password, setUserPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  //DO set needed hooks
  const navigate = useNavigate();
  
  //DO handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(`[handleSubmit form username: ${username}, password: ${password}, errorMessage: ${errorMessage}]` )
    
    //! build user object to be sent
    const user = { username, password }

    try {
      //! connect to server for autentication and save Token
      const response = await loginService(user)
      const { authToken } = response.data
      localStorage.setItem("authToken", authToken)
      props.setIsLoggedIn(true)

      //! redirect client to private page
      navigate(`/users`)
      
    } catch (err) {

      if (err.response && err.response.status === 400) {
        setErrorMessage(err.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  //DO render component
  return (
    <div>
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username: </label>
        <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)}/>

        <br />
        <label htmlFor="password">Password: </label>
        <input type="password" name="password" value={password} onChange={(e) => setUserPassword(e.target.value)}/>

        <button>Login</button>
      </form>
      <p>{errorMessage}</p>
    </div>
  );
}

//DO export component
export default Login;
