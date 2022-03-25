//DO import needed modules
import { getAllCollabsService, addNewCollabService, getCollabDetailsService, updateCollabService, deleteCollabService } from "../services/collab.services";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser, faEye, faPencil } from "@fortawesome/free-solid-svg-icons";
import { Avatar, Alert, Button, Card, CardActions, CardContent, CardMedia, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, Link, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from "@mui/material";

function CollabList() {
  //DO create a state to control info
  const [allCollabs, setAllCollabs] = useState(null);

  const [collabUpdateId, setCollabUpdateId] = useState(null);
  const [collabDeleteId, setCollabDeleteId] = useState(null);

  const [name, setName] = useState("");
  const handleName = (e) => {
    setName(e.target.value);
  };

  const [description, setDescription] = useState("");
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const [registerUrl, setRegisterUrl] = useState("");
  const handleRegisterUrl = (e) => {
    setRegisterUrl(e.target.value);
  };

  const [logo, setLogo] = useState("");
  const handleLogo = (e) => {
    setLogo(e.target.value);
  };

  const [visibility, setVisibility] = useState("");
  const handleVisibility = (e) => {
    setVisibility(e.target.checked);
  };

  const [modalStatusCollabDetail, setModalStatusCollabDetail] = useState(false); // updateCause modal state
  const [modalStatusCollabAdd, setModalStatusCollabAdd] = useState(false); // addCause modal state
  const [modalStatusCollabUpdate, setModalStatusCollabUpdate] = useState(false); // updateCause modal state
  const [modalStatusCollabDelete, setModalStatusCollabDelete] = useState(false); // updateCause modal state

  const [errorMessage, setErrorMessage] = useState("");

  //DO navigator hook
  const navigate = useNavigate();

  //DO useEffect to look for info
  useEffect(() => {
    getAllCollabs();
  }, []);

  //DO async function to obtain data from DB
  const getAllCollabs = async () => {
    try {
      //? obtain info from DB
      const response = await getAllCollabsService();
      setAllCollabs(response.data);
    } catch (err) {
      navigate("/error");
    }
  };

  //DO use loading system to prevent errors
  if (!allCollabs) {
    return <div>...Loading</div>;
  }

  //* COLLAB DETAIL
  //DO collab DETAIL open modal window
  const handleClickDetailCollabOpen = async (id) => {
    try {
      const response = await getCollabDetailsService(id);
      const { name, description, registerUrl, logo, visibility } = response.data;
      setName(name);
      setDescription(description);
      setRegisterUrl(registerUrl);
      setLogo(logo);
      setVisibility(visibility);
      setModalStatusCollabDetail(true);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setErrorMessage(err.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  //DO collab DETAIL close modal window
  const handleClickDetailCollabClose = () => {
    setModalStatusCollabDetail(false);
  };
  //! COLLAB DETAIL

  //* COLLAB ADD
  //DO collab ADD open modal window
  const handleClickAddCollabOpen = () => {
    setName("");
    setDescription("");
    setRegisterUrl("");
    setLogo("");
    setVisibility("");
    setModalStatusCollabAdd(true);
  };

  //DO collab ADD routine
  const handleAddCollabSubmit = async () => {
    try {
      const newCause = { name, description, registerUrl, logo };
      await addNewCollabService(newCause);
      getAllCollabs();
      setModalStatusCollabAdd(false);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setErrorMessage(err.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  //DO collab ADD close modal window
  const handleClickCollabAddClose = () => {
    setModalStatusCollabAdd(false);
  };
  //! COLLAB ADD

  //* COLLAB UPDATE
  //DO collab UPDATE open modal window
  const handleClickUpdateCollabOpen = async (id) => {
    try {
      const response = await getCollabDetailsService(id);
      const { name, description, registerUrl, logo, visibility } = response.data;
      setCollabUpdateId(id);
      setName(name);
      setDescription(description);
      setRegisterUrl(registerUrl);
      setLogo(logo);
      setVisibility(visibility);
      setModalStatusCollabUpdate(true);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setErrorMessage(err.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  //DO collab UPDATE routine
  const handleClickUpdateSubmit = async () => {
    try {
      await updateCollabService(collabUpdateId, { name, description, registerUrl, logo, visibility });
      setModalStatusCollabUpdate(false);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setErrorMessage(err.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  //DO collab UPDATE close modal windows
  const handleClickUpdateCollabClose = () => {
    setModalStatusCollabUpdate(false);
  };
  //! COLLAB UPDATE

  //* COLLAB DELETE
  //DO collab DELETE open modal window
  const handleClickDeleteCollabOpen = async (id) => {
    try {
      const response = await getCollabDetailsService(id);
      const { name, description, registerUrl, logo, visibility } = response.data;
      setCollabDeleteId(id);
      setName(name);
      setDescription(description);
      setRegisterUrl(registerUrl);
      setLogo(logo);
      setVisibility(visibility);
      setModalStatusCollabDelete(true);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setErrorMessage(err.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  //DO collab DELETE routine
  const handleClickDeleteCollabSubmit = async () => {
    try {
      await deleteCollabService(collabDeleteId);
      getAllCollabs();
      setModalStatusCollabDelete(false);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setErrorMessage(err.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  //DO collab DELETE close modal window
  const handleClickDeleteCollabClose = () => {
    setModalStatusCollabDelete(false);
  };
  //! COLLAB DELETE

  return (
    <div className="data-list">
      <h1>Collaborators</h1>
      {/* <p>{errorMessage}</p> */}
      <Button onClick={handleClickAddCollabOpen} variant="outlined" style={{ marginBottom: "30px" }}>
        Add new collaborator
      </Button>

      {/* Begin modal window all collaborator list */}
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
            {allCollabs.map((eachCollab, index) => {
              return (
                <TableRow key={index + eachCollab.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell align="center" component="th" scope="row">
                    <Avatar src={eachCollab.logo} alt="logo" />
                  </TableCell>
                  <TableCell>{eachCollab.name}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="View details">
                      <Button onClick={() => handleClickDetailCollabOpen(eachCollab._id)} style={{ maxWidth: "30px", maxHeight: "30px", minWidth: "30px", minHeight: "30px" }}>
                        <FontAwesomeIcon icon={faEye} color={"green"} />
                      </Button>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Update">
                      <Button onClick={() => handleClickUpdateCollabOpen(eachCollab._id)} style={{ maxWidth: "30px", maxHeight: "30px", minWidth: "30px", minHeight: "30px" }}>
                        <FontAwesomeIcon icon={faPencil} color={"blue"} />
                      </Button>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Delete">
                      <Button onClick={() => handleClickDeleteCollabOpen(eachCollab._id)} style={{ maxWidth: "30px", maxHeight: "30px", minWidth: "30px", minHeight: "30px" }}>
                        <FontAwesomeIcon icon={faEraser} color={"red"} />
                      </Button>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* End modal window all collaborator list*/}

      {/* Begin modal window collaborator detail */}
      <Dialog open={modalStatusCollabDetail} onClose={handleClickDetailCollabClose}>
        <DialogContent>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia component="img" height="140" image={logo} alt="charitable cause image" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Description: {description}
              </Typography>
              <CardActions>
                <Link href={registerUrl} target="blank">
                  <Button size="small" variant="outlined" sx={{ backgroundColor: "lightGreen", marginRight: 2 }}>
                    Visit site
                  </Button>
                </Link>
                <Button onClick={handleClickDetailCollabClose} size="small" variant="outlined" sx={{ backgroundColor: "lightBlue" }}>
                  Turn back
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
      {/* End modal window collaborator detail*/}

      {/* Begin modal window collaborator add */}
      <Dialog open={modalStatusCollabAdd} onClose={handleClickCollabAddClose}>
        <DialogTitle>Add new collaborator</DialogTitle>
        <DialogContent>
          <FormControl>
          {errorMessage && (<Stack sx={{ width: "100%", marginBottom: "1rem" }} spacing={2}><Alert severity="error">{errorMessage}</Alert></Stack>)}

            <TextField label="Collaborator name:* " name="name" id="name" value={name} aria-describedby="name-helper-text" onChange={handleName} />
            <FormHelperText id="name-helper-text"> Collaborator name (required) </FormHelperText>

            <TextField label="Description:* " name="description" id="description" value={description} aria-describedby="description-helper-text" onChange={handleDescription} />
            <FormHelperText id="description-helper-text"> Collaborator description (required) </FormHelperText>

            <TextField label="Register URL: " name="registerUrl" id="registerUrl" value={registerUrl} aria-describedby="uregisterUrlrl-helper-text" onChange={handleRegisterUrl} />
            <FormHelperText id="registerUrl-helper-text"> Register URL </FormHelperText>

            <TextField label="Logo: " name="logo" id="logo" value={logo} aria-describedby="logo-helper-text" onChange={handleLogo} />
            <FormHelperText id="logo-helper-text"> Collaborator logo </FormHelperText>

            <DialogActions>
              <Button type="submit" onClick={handleAddCollabSubmit} size="small" variant="outlined" sx={{ backgroundColor: "lightGreen" }}>
                Add
              </Button>
              <Button type="submit" onClick={handleClickCollabAddClose} size="small" variant="outlined" sx={{ backgroundColor: "lightBlue" }}>
                Cancel
              </Button>
            </DialogActions>
          </FormControl>
        </DialogContent>
      </Dialog>
      {/* End modal window collaborator add */}

      {/* Begin modal window collaborator update */}
      <Dialog open={modalStatusCollabUpdate} onClose={handleClickUpdateCollabClose}>
        <DialogTitle>Update collaborator</DialogTitle>
        <DialogContent>
          <FormControl>
          {errorMessage && (<Stack sx={{ width: "100%", marginBottom: "1rem" }} spacing={2}><Alert severity="error">{errorMessage}</Alert></Stack>)}

            <TextField label="Cause name:* " name="name" id="name" value={name} aria-describedby="name-helper-text" onChange={handleName} />
            <FormHelperText id="name-helper-text"> Collaborator name (required) </FormHelperText>

            <TextField label="Description:* " name="description" id="description" value={description} aria-describedby="description-helper-text" onChange={handleDescription} />
            <FormHelperText id="description-helper-text"> Collaborator description (required) </FormHelperText>

            <TextField label="Register URL: " name="registerUrl" id="registerUrl" value={registerUrl} aria-describedby="registerUrl-helper-text" onChange={handleRegisterUrl} />
            <FormHelperText id="registerUrl-helper-text"> The URL of the entity which will pay the margin for donations </FormHelperText>

            <TextField label="Logo: " name="logo" id="logo" value={logo} aria-describedby="logo-helper-text" onChange={handleLogo} />
            <FormHelperText id="logo-helper-text"> Collaborator logo </FormHelperText>

            <Typography variant="body2" color="text.secondary">
              Visibility: <Checkbox checked={visibility} onChange={handleVisibility} />
            </Typography>

            <DialogActions>
              <Button type="submit" onClick={handleClickUpdateSubmit} size="small" variant="outlined" sx={{ backgroundColor: "lightGreen" }}>
                Save
              </Button>
              <Button type="submit" onClick={handleClickUpdateCollabClose} size="small" variant="outlined" sx={{ backgroundColor: "lightBlue" }}>
                Cancel
              </Button>
            </DialogActions>
          </FormControl>
        </DialogContent>
      </Dialog>
      {/* End modal window collaborator update */}

      {/* Begin modal window collaborator delete */}
      <Dialog open={modalStatusCollabDelete} onClose={handleClickDeleteCollabClose} sx={{ backgroundColor: "red" }}>
        <DialogTitle>Delete collaborator</DialogTitle>
        <DialogContent>
          <Card sx={{ maxWidth: 345 }}>
          {errorMessage && (<Stack sx={{ width: "100%", marginBottom: "1rem" }} spacing={2}><Alert severity="error">{errorMessage}</Alert></Stack>)}

            <CardMedia component="img" height="140" image={logo} alt="charitable cause image" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Description: {description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                URL: {registerUrl}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Visibility: <Checkbox checked={visibility} />
              </Typography>
              <Stack sx={{ width: "100%", marginTop: "1rem", marginBottom: "1rem" }} spacing={2}>
                <Alert severity="error">{"ATTENTION! This action can not be undone!"}</Alert>
              </Stack>
              <CardActions>
                <Button onClick={handleClickDeleteCollabSubmit} size="small" variant="outlined" sx={{ backgroundColor: "red" }}>
                  Delete
                </Button>
                <Button onClick={handleClickDeleteCollabClose} size="small" variant="outlined" sx={{ backgroundColor: "lightBlue" }}>
                  Cancel
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
      {/* End modal window collaborator delete */}
    </div>
  );
}

export default CollabList;
