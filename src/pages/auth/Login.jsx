//DO import needed modules
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from "../../services/auth.services";
import { Button, FormControl, Stack, TextField } from "@mui/material";

function Login(props) {
  //DO set needed states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  //DO set needed hooks
  const navigate = useNavigate();

  //DO handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    //! build user object to be sent
    const user = { username, password };

    try {
      //! connect to server for autentication and save Token
      const response = await loginService(user);
      const { authToken } = response.data;
      localStorage.setItem("authToken", authToken);
      props.setIsLoggedIn(true);

      //! redirect client to private page
      navigate(`/users`);
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
      <p>{errorMessage}</p>

      <FormControl>
        <TextField
          label="Username: "
          name="username"
          id="username"
          value={username}
          aria-describedby="username-helper-text"
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          label="Password: "
          name="password"
          id="password"
          type="password"
          value={password}
          aria-describedby="password-helper-text"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Stack direction="row" spacing={2}>
          <Button type="submit" onClick={handleSubmit} size="small" variant="outlined" sx={{ backgroundColor: "lightGreen" }}>
            Login
          </Button>
          <Button type="submit" onClick={() => navigate(-1)} size="small" variant="outlined" sx={{ backgroundColor: "lightBlue" }}>
            Go back
          </Button>
        </Stack>
      </FormControl>
    </div>
  );
}

//DO export component
export default Login;
