//DO import needed modules
import { getAllUsersService, getUserDetailsService, addNewUserService, updateUserService, deleteUserService } from "../services/user.services";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser, faEye, faPencil } from "@fortawesome/free-solid-svg-icons";
import { Avatar, Alert, Button, Card, CardActions, CardContent, CardMedia, Dialog, DialogContent, DialogTitle, FormControl, FormHelperText, MenuItem, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from "@mui/material";
import { ClipLoader } from "react-spinners";

function UsersList() {
  //DO create a state to control info
  const [modalWindowStatusDetails, setModalWindowStatusDetails] = useState(false);
  const [modalWindowStatusAdd, setModalWindowStatusAdd] = useState(false);
  const [modalWindowStatusPatch, setModalWindowStatusPatch] = useState(false);
  const [modalWindowStatusDelete, setModalWindowStatusDelete] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  //const [loading, setLoading] = useState(true);

  const [patchId, setPatchId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [allUsers, setAllUsers] = useState(null);

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

  //DO navigator hook
  const navigate = useNavigate();

  //DO useEffect to look for info
  useEffect(() => {
    getAllUsers();
    //setLoading(false);
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

  //* USER DETAIL
  //DO modal window open DETAILS
  const handleClickModalWindowOpenDetails = async (id) => {
    try {
      const response = await getUserDetailsService(id);
      const { username, email, level, avatar } = response.data;
      //setUserUpdateId(id);
      setUsername(username);
      setEmail(email);
      setLevel(level);
      setAvatar(avatar);

      setModalWindowStatusDetails(true);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setErrorMessage(err.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  //DO modal window close DETAILS
  const handleClickModalWindowCloseDetails = () => {
    setModalWindowStatusDetails(false);
  };
  //! USER DETAIL

  //* USER ADD
  //DO modal window open ADD
  const handleClickModalWindowOpenAdd = async (id) => {
    setUsername("");
    setEmail("");
    setPassword("");
    setLevel("user");
    setAvatar("");

    setErrorMessage("");
    setModalWindowStatusAdd(true);
  };

  //DO routine ADD
  const handleClickSubmitAdd = async () => {
    try {
      const newUser = { username, email, password, level, avatar };
      await addNewUserService(newUser);
      getAllUsers();
      setModalWindowStatusAdd(false);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setErrorMessage(err.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  //DO modal window close ADD
  const handleClickModalWindowCloseAdd = () => {
    setErrorMessage("");
    setModalWindowStatusAdd(false);
  };
  //! USER ADD

  //* USER UPDATE
  //DO modal window open UPDATE
  const handleClickModalWindowOpenPatch = async (id) => {
    const response = await getUserDetailsService(id);
    const { username, email, level, avatar } = response.data;
    setPatchId(id);
    setUsername(username);
    setEmail(email);
    setLevel(level);
    setAvatar(avatar);

    setErrorMessage("");
    setModalWindowStatusPatch(true);
  };

  //DO routine UPDATE
  const handleClickSubmitPatch = async () => {
    try {
      await updateUserService(patchId, { username, email, password, level, avatar });
      getAllUsers();
      setModalWindowStatusPatch(false);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setErrorMessage(err.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  //DO modal window close UPDATE
  const handleClickModalWindowClosePatch = () => {
    setErrorMessage("");
    setModalWindowStatusPatch(false);
  };
  //! USER UPDATE

  //* USER DELETE
  //DO modal window open DELETE
  const handleClickModalWindowOpenDelete = async (id) => {
    const response = await getUserDetailsService(id);
    const { username, email, level, avatar } = response.data;
    setDeleteId(id);
    setUsername(username);
    setEmail(email);
    setLevel(level);
    setAvatar(avatar);
      
    setErrorMessage("");
    setModalWindowStatusDelete(true);
};

  //DO DELETE routine
  const handleClickSubmitDelete = async () => {
    try {
      await deleteUserService(deleteId);
      getAllUsers();
      setModalWindowStatusDelete(false);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setErrorMessage(err.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  //DO DELETE modal window close
  const handleClickModalWindowCloseDelete = () => {
    setErrorMessage("");
    setModalWindowStatusDelete(false);
  };
  //! USER DELETE

  //DO use loading system to prevent errors
  if (!allUsers) {
    return ( <div><br /><br /><ClipLoader color="red" size={50} /></div> );
  }

  return (
    <div className="data-list">
      <h1>Users List</h1>
      {/* <p>{errorMessage}</p> */}
      <Button onClick={handleClickModalWindowOpenAdd} variant="outlined" style={{ marginBottom: "30px" }}>
        Add new user
      </Button>

      {/* Begin modal window all users list */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 300 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Avatar</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="center">View</TableCell>
              <TableCell align="center">Edit</TableCell>
              <TableCell align="center">Del</TableCell>
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
                      <Button onClick={() => handleClickModalWindowOpenDetails(eachUser._id)}>
                        <FontAwesomeIcon icon={faEye} color={"green"} style={{ maxWidth: "1rem", maxHeight: "1rem", minWidth: "1rem", minHeight: "1rem1rem" }} />
                      </Button>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Update">
                      <Button onClick={() => handleClickModalWindowOpenPatch(eachUser._id)}>
                        <FontAwesomeIcon icon={faPencil} color={"blue"} style={{ maxWidth: "1rem", maxHeight: "1rem", minWidth: "1rem", minHeight: "1rem" }} />
                      </Button>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Delete">
                      <Button onClick={() => handleClickModalWindowOpenDelete(eachUser._id)}>
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
      <Dialog open={modalWindowStatusDetails} onClose={handleClickModalWindowCloseDetails}>
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
                <Button onClick={handleClickModalWindowCloseDetails} size="small" variant="outlined" sx={{ backgroundColor: "lightBlue" }}>
                  Turn back
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
      {/* End modal window user detail */}

      {/* Begin modal window user add */}
      <Dialog open={modalWindowStatusAdd} onClose={handleClickModalWindowCloseAdd}>
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
              <Button type="submit" onClick={handleClickSubmitAdd} size="small" variant="outlined" sx={{ backgroundColor: "lightGreen" }}>
                Add
              </Button>
              <Button type="submit" onClick={handleClickModalWindowCloseAdd} size="small" variant="outlined" sx={{ backgroundColor: "lightBlue" }}>
                Cancel
              </Button>
            </Stack>
          </FormControl>
        </DialogContent>
      </Dialog>
      {/* End modal window user add */}

      {/* Begin modal window user update */}
      <Dialog open={modalWindowStatusPatch} onClose={handleClickModalWindowClosePatch}>
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
              <Button type="submit" onClick={handleClickSubmitPatch} size="small" variant="outlined" sx={{ backgroundColor: "lightGreen" }}>
                Save
              </Button>
              <Button type="submit" onClick={handleClickModalWindowClosePatch} size="small" variant="outlined" sx={{ backgroundColor: "lightBlue" }}>
                Cancel
              </Button>
            </Stack>
          </FormControl>
        </DialogContent>
      </Dialog>
      {/* End modal window user update */}

      {/* Begin modal window user delete */}
      <Dialog open={modalWindowStatusDelete} onClose={handleClickModalWindowCloseDelete} sx={{ backgroundColor: "red" }}>
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
                <Button onClick={handleClickSubmitDelete} size="small" variant="outlined" sx={{ backgroundColor: "red" }}>
                  Delete
                </Button>
                <Button onClick={handleClickModalWindowCloseDelete} size="small" variant="outlined" sx={{ backgroundColor: "lightBlue" }}>
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
