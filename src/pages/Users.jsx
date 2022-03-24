//DO import needed modules
import { getAllUsersService, getUserDetailsService, addNewUserService, updateUserService, deleteUserService } from "../services/user.services";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser, faEye, faPencil } from "@fortawesome/free-solid-svg-icons";
import { Avatar, Alert, Button, Card, CardActions, CardContent, CardMedia, Dialog, DialogContent, DialogTitle, FormControl, FormHelperText, MenuItem, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from "@mui/material";

function UsersList() {
  //DO create a state to control info
  const [allUsers, setAllUsers] = useState(null);

  const [userUpdateId, setUserUpdateId] = useState(null);
  const [userDeleteId, setUserDeleteId] = useState(null);

  const [username, setUsername] = useState("");
  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const [email, setEmail] = useState("");
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const [password, setPassword] = useState("");
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const [level, setLevel] = useState("");
  const handleLevel = (e) => {
    setLevel(e.target.value);
  };

  const [avatar, setAvatar] = useState("");
  const handleAvatar = (e) => {
    setAvatar(e.target.value);
  };

  const [modalStatusUserDetail, setModalStatusUserDetail] = useState(false); // userDetail modal state
  const [modalStatusUserAdd, setModalStatusUserAdd] = useState(false); // userAdd modal state
  const [modalStatusUserUpdate, setModalStatusUserUpdate] = useState(false); // userUpdate modal state
  const [modalStatusUserDelete, setModalStatusUserDelete] = useState(false); // userDelete modal state

  const [errorMessage, setErrorMessage] = useState("");

  //DO navigator hook
  const navigate = useNavigate();

  //DO useEffect to look for info
  useEffect(() => {
    getAllUsers();
  }, []);

  //DO async function to obtain data from DB
  const getAllUsers = async () => {
    try {
      //? obtain info from DB
      const response = await getAllUsersService();
      setAllUsers(response.data);
    } catch (err) {
      navigate("/error");
    }
  };

  //DO use loading system to prevent errors
  if (!allUsers) {
    return <h3>...Loading</h3>;
  }

  //* USER DETAIL
  //DO user DETAIL open modal window
  const handleClickUserDetailOpen = async (id) => {
    try {
      const response = await getUserDetailsService(id);
      const { username, email, level, avatar } = response.data;
      setUserUpdateId(id);
      setUsername(username);
      setEmail(email);
      setLevel(level);
      setAvatar(avatar);
      setModalStatusUserDetail(true);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setErrorMessage(err.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  //DO user DETAIL close modal window
  const handleClickUserDetailClose = () => {
    setModalStatusUserDetail(false);
  };
  //! USER DETAIL

  //* USER ADD
  //DO user ADD open modal window
  const handleClickUserAddOpen = async (id) => {
    setUsername("");
    setEmail("");
    setPassword("");
    setLevel("user");
    setAvatar("");
    setErrorMessage("");
    setModalStatusUserAdd(true);
  };

  //DO user ADD routine
  const handleAddUserSubmit = async () => {
    try {
      const newUser = { username, email, password, level, avatar };
      await addNewUserService(newUser);
      getAllUsers();
      setModalStatusUserAdd(false);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setErrorMessage(err.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  //DO user ADD close modal window
  const handleClickUserAddClose = () => {
    setErrorMessage("");
    setModalStatusUserAdd(false);
  };
  //! USER ADD

  //* USER UPDATE
  //DO user UPDATE open modal window
  const handleClickUserUpdateOpen = async (id) => {
    const response = await getUserDetailsService(id);
    const { username, email, level, avatar } = response.data;
    setUserUpdateId(id);
    setUsername(username);
    setEmail(email);
    setLevel(level);
    setAvatar(avatar);
    setErrorMessage("");
    setModalStatusUserUpdate(true);
  };

  //DO user UPDATE routine
  const handleClickUserUpdateSubmit = async () => {
    try {
      await updateUserService(userUpdateId, { username, email, password, level, avatar });
      setModalStatusUserUpdate(false);
      getAllUsers();
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setErrorMessage(err.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  //DO user UPDATE close modal window
  const handleClickUserUpdateClose = () => {
    setErrorMessage("");
    setModalStatusUserUpdate(false);
  };
  //! USER UPDATE

  //* USER DELETE
  //DO user DELETE open modal window
  const handleClickUserDeleteOpen = async (id) => {
    const response = await getUserDetailsService(id);
    const { username, email, level, avatar } = response.data;
    setUserDeleteId(id);
    setUsername(username);
    setEmail(email);
    setLevel(level);
    setAvatar(avatar);
    setErrorMessage("");
    setModalStatusUserDelete(true);
  };

  //DO user DELETE routine
  const handleClickUserDeleteSubmit = async () => {
    try {
      await deleteUserService(userDeleteId);
      getAllUsers();
      setModalStatusUserDelete(false);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setErrorMessage(err.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  //DO user DELETE close modal window
  const handleClickUserDeleteClose = () => {
    setErrorMessage("");
    setModalStatusUserDelete(false);
  };
  //! USER DELETE

  return (
    <div className="data-list">
      <h1>All users List</h1>
      {/* <p>{errorMessage}</p> */}
      <Button onClick={handleClickUserAddOpen} variant="outlined" style={{ marginBottom: "30px" }}>
        Add new user
      </Button>

      {/* Begin modal window all users list */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 300 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Avatar</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="center">V</TableCell>
              <TableCell align="center">E</TableCell>
              <TableCell align="center">D</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allUsers.map((eachUser, index) => {
              return (
                <TableRow key={index + eachUser.username} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell align="center" component="th" scope="row">
                    <Avatar src={eachUser.avatar} alt="avatar" />
                  </TableCell>
                  <TableCell>{eachUser.username}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="View details">
                      <Button onClick={() => handleClickUserDetailOpen(eachUser._id)}>
                        <FontAwesomeIcon icon={faEye} color={"green"} style={{ maxWidth: "1rem", maxHeight: "1rem", minWidth: "1rem", minHeight: "1rem1rem" }} />
                      </Button>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Update">
                      <Button onClick={() => handleClickUserUpdateOpen(eachUser._id)}>
                        <FontAwesomeIcon icon={faPencil} color={"blue"} style={{ maxWidth: "1rem", maxHeight: "1rem", minWidth: "1rem", minHeight: "1rem" }} />
                      </Button>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Delete">
                      <Button onClick={() => handleClickUserDeleteOpen(eachUser._id)}>
                        <FontAwesomeIcon icon={faEraser} color={"red"} style={{ maxWidth: "1rem", maxHeight: "1rem", minWidth: "1rem", minHeight: "1rem" }} />
                      </Button>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* End modal window all users list */}

      {/* Begin modal window user detail */}
      <Dialog open={modalStatusUserDetail} onClose={handleClickUserDetailClose}>
        <DialogContent>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia component="img" height="140" image={avatar} alt="green iguana" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Username: {username}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Level: {level}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                E-mail: {email}
              </Typography>
              <CardActions>
                <Button onClick={handleClickUserDetailClose} size="small" variant="outlined" sx={{ backgroundColor: "lightBlue" }}>
                  Turn back
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
      {/* End modal window user detail */}

      {/* Begin modal window user add */}
      <Dialog open={modalStatusUserAdd} onClose={handleClickUserAddClose}>
        <DialogTitle>Add new user</DialogTitle>
        <DialogContent>
          <FormControl>
            {errorMessage && (
              <Stack sx={{ width: "100%", marginBottom: "1rem" }} spacing={2}>
                <Alert severity="error">{errorMessage}</Alert>
              </Stack>
            )}
            <Select value={level} name="level" id="level" onChange={handleLevel}>
              <MenuItem value={"user"}>Select level</MenuItem>
              <MenuItem selected={level === "user" && true} value={"user"}>
                User
              </MenuItem>
              <MenuItem selected={level === "admin" && true} value={"admin"}>
                Admin
              </MenuItem>
            </Select>

            <TextField label="Username:* " name="username" id="username" value={username} onChange={handleUsername} aria-describedby="username-helper-text" />
            <FormHelperText id="username-helper-text">Username will be used for login</FormHelperText>

            <TextField label="E-mail:* " name="email" id="email" value={email} onChange={handleEmail} aria-describedby="email-helper-text" />
            <FormHelperText id="email-helper-text">We'll never share your email.</FormHelperText>

            <TextField label="Password:* " name="password" id="password" type="password" value={password} aria-describedby="password-helper-text" onChange={handlePassword} />
            <FormHelperText id="password-helper-text">Password must have between 8 and 15 characters and contain at least one of: uppercase and lowercase letters, numbers and special characters.</FormHelperText>

            <TextField label="Avatar: " name="avatar" id="avatar" value={avatar} aria-describedby="avatar-helper-text" onChange={handleAvatar} />
            <FormHelperText id="avatar-helper-text">Avatar will be the personal icon.</FormHelperText>
            <Stack direction="row" spacing={2}>
              <Button type="submit" onClick={handleAddUserSubmit} size="small" variant="outlined" sx={{ backgroundColor: "lightGreen" }}>
                Add
              </Button>
              <Button type="submit"onClick={handleClickUserAddClose} size="small" variant="outlined" sx={{ backgroundColor: "lightBlue" }}>
                Cancel
              </Button>
            </Stack>
          </FormControl>
        </DialogContent>
      </Dialog>
      {/* End modal window user add */}

      {/* Begin modal window user update */}
      <Dialog open={modalStatusUserUpdate} onClose={handleClickUserUpdateClose}>
        <DialogTitle>Update user</DialogTitle>
        <DialogContent>
          <FormControl>
            {errorMessage && (
              <Stack sx={{ width: "100%", marginBottom: "1rem" }} spacing={2}>
                <Alert severity="error">{errorMessage}</Alert>
              </Stack>
            )}
            <Select value={level} name="level" id="level" onChange={handleLevel}>
              <MenuItem value={"user"}>Select level</MenuItem>
              <MenuItem selected={level === "user" && true} value={"user"}>
                User
              </MenuItem>
              <MenuItem selected={level === "admin" && true} value={"admin"}>
                Admin
              </MenuItem>
            </Select>

            <TextField label="Username:* " name="username" id="username" value={username} aria-describedby="username-helper-text" onChange={handleUsername} focused />
            <FormHelperText id="username-helper-text">Username will be used for login</FormHelperText>

            <TextField label="E-mail:* " name="email" id="email" value={email} aria-describedby="email-helper-text" onChange={handleEmail} />
            <FormHelperText id="email-helper-text">We'll never share your email.</FormHelperText>

            <TextField label="Password:* " name="password" id="password" type="password" value={password} aria-describedby="password-helper-text" onChange={handlePassword} />
            <FormHelperText id="password-helper-text">Password must have between 8 and 15 characters and contain at least one of: uppercase and lowercase letters, numbers and special characters.</FormHelperText>

            <TextField label="Avatar: " name="avatar" id="avatar" value={avatar} aria-describedby="avatar-helper-text" onChange={handleAvatar} />
            <FormHelperText id="avatar-helper-text">Avatar will be the personal icon.</FormHelperText>
            <Stack direction="row" spacing={2}>
              <Button type="submit" onClick={handleClickUserUpdateSubmit} size="small" variant="outlined" sx={{ backgroundColor: "lightGreen" }}>
                Save
              </Button>
              <Button type="submit" onClick={handleClickUserUpdateClose} size="small" variant="outlined" sx={{ backgroundColor: "lightBlue" }}>
                Cancel
              </Button>
            </Stack>
          </FormControl>
        </DialogContent>
      </Dialog>
      {/* End modal window user update */}

      {/* Begin modal window user delete */}
      <Dialog open={modalStatusUserDelete} onClose={handleClickUserDeleteClose} sx={{ backgroundColor: "red" }}>
        <DialogTitle>Delete user</DialogTitle>
        <DialogContent>
          <Card sx={{ maxWidth: 345 }}>
            {errorMessage && (
              <Stack sx={{ width: "100%", marginBottom: "1rem" }} spacing={2}>
                <Alert severity="error">{errorMessage}</Alert>
              </Stack>
            )}
            <CardMedia component="img" height="140" image={avatar} alt="green iguana" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Username: {username}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Level: {level}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                E-mail: {email}
              </Typography>
              <Stack sx={{ width: "100%", marginTop: "1rem", marginBottom: "1rem" }} spacing={2}>
                <Alert severity="error">{"ATTENTION! This action can not be undone!"}</Alert>
              </Stack>
              <CardActions>
                <Button onClick={handleClickUserDeleteSubmit} size="small" variant="outlined" sx={{ backgroundColor: "red" }}>
                  Delete
                </Button>
                <Button onClick={handleClickUserDeleteClose} size="small" variant="outlined" sx={{ backgroundColor: "lightBlue" }}>
                  Cancel
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
      {/* End modal window user delete */}
    </div>
  );
}

export default UsersList;
