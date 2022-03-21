//DO import needed modules
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserDetailsService, updateUserService, } from "../../services/user.services";
import {
  Button,
  FormControl,
  FormHelperText,
  TextField,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";

function UserEdit() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [level, setLevel] = useState("");
  const [avatar, setAvatar] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleLevel = (e) => {
    setLevel(e.target.value);
  };
  const handleAvatar = (e) => {
    setAvatar(e.target.value);
  };

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    try {
      const response = await getUserDetailsService(id);

      setUsername(response.data.username);
      setEmail(response.data.email);
      //setPassword(response.data.password);
      setLevel(response.data.level);
      setAvatar(response.data.avatar);
    } catch (err) {
      navigate("/error")
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      updateUserService(id, { username, email, password, level, avatar });
      navigate(`/users/details/${id}`);
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
      <h3>Edit User</h3>
      <p>{errorMessage}</p>

      <FormControl>
        <Select value={level} name="level" id="level" onChange={handleLevel}>
          <MenuItem value={"user"}>Select level</MenuItem>
          <MenuItem selected={level==="user" && true} value={"user"}>User</MenuItem>
          <MenuItem selected={level==="admin" && true} value={"admin"}>Admin</MenuItem>
        </Select>

        <TextField
          label="Username: "
          name="username"
          id="username"
          value={username}
          aria-describedby="username-helper-text"
          onChange={handleUsername}
          focused
        />
        <FormHelperText id="username-helper-text">
          Username will be used for login
        </FormHelperText>

        <TextField
          label="E-mail: "
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
          label="Password: "
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

        <TextField
          label="Avatar: "
          name="avatar"
          id="avatar"
          value={avatar}
          aria-describedby="avatar-helper-text"
          onChange={handleAvatar}
        />
        <FormHelperText id="avatar-helper-text">
          Avatar will be the personal icon.
        </FormHelperText>
        <Stack direction="row" spacing={2}>
        <Button type="submit" variant="outlined" onClick={handleSubmit}>
        Save
        </Button>
        <Button type="submit" variant="outlined" onClick={() => navigate(-1)}>
        Cancel
        </Button>
        </Stack>
      </FormControl>
    </div>
  );
}

export default UserEdit;
