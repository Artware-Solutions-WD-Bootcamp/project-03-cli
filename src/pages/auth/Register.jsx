//DO import needed modules
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerService } from "../../services/auth.services.js";
import { Button, FormControl, FormHelperText, Stack, TextField } from "@mui/material";

function Register() {
  //DO set needed states
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  //DO set needed hooks
  const navigate = useNavigate();

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  //DO handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    //! build user object to be sent
    const user = { username, email, password };

    try {
      //! send user to backend to create it
      await registerService(user);

      //! redirect user to desired page
      navigate("/login");
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setErrorMessage(err.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };
  return (
    <div>
      <h3>Registrarse</h3>
      <p>{errorMessage}</p>
      <FormControl>
        <TextField
          label="Username:* "
          name="username"
          id="username"
          value={username}
          aria-describedby="username-helper-text"
          onChange={handleUsername}
          />
        <FormHelperText id="username-helper-text">
          Username will be used for login
        </FormHelperText>

        <TextField
          label="E-mail:* "
          name="email"
          id="email"
          value={email}
          aria-describedby="email-helper-text"
          onChange={handleEmail}
        />
        <FormHelperText id="email-helper-text">
          We'll never share your email.
        </FormHelperText>

        <TextField
          label="Password:* "
          name="password"
          id="password"
          type="password"
          value={password}
          aria-describedby="password-helper-text"
          onChange={handlePassword}
        />
        <FormHelperText id="password-helper-text">
          Password must have between 8 and 15 characters and contain at least
          one of: uppercase and lowercase letters, numbers and special
          characters.
        </FormHelperText>
        <Stack direction="row" spacing={2}>
        <Button type="submit" onClick={handleSubmit} size="small" variant="outlined" sx={{ backgroundColor: "lightGreen" }}>
          Add
        </Button>
        <Button type="submit" onClick={() => navigate(-1)} size="small" variant="outlined" sx={{ backgroundColor: "lightBlue" }}>
          Cancel
        </Button>
        </Stack>
      </FormControl>
    </div>
  );
}

export default Register;
