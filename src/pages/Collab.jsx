//DO import needed modules
import { getAllCollabsService, postCollabService, getCollabDetailsService, patchCollabService, deleteCollabService } from "../services/collab.services";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser, faEye, faPencil } from "@fortawesome/free-solid-svg-icons";
import { Avatar, Alert, Button, Card, CardActions, CardContent, CardMedia, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, Link, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from "@mui/material";
import { ClipLoader } from "react-spinners";

function CollabList(props) {
  const { isLoggedIn } = props;

  //DO create a state to control info
  const [modalWindowStatusDetails, setModalWindowStatusDetails] = useState(false);
  const [modalWindowStatusAdd, setModalWindowStatusAdd] = useState(false);
  const [modalWindowStatusPatch, setModalWindowStatusPatch] = useState(false);
  const [modalWindowStatusDelete, setModalWindowStatusDelete] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  //const [loading, setLoading] = useState(true);

  const [patchId, setPatchId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [allCollabs, setAllCollabs] = useState(null);

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

  const [visibility, setVisibility] = useState(true);
  const handleVisibility = (e) => {
    setVisibility(e.target.checked);
  };

  //DO navigator hook
  const navigate = useNavigate();

  //DO useEffect to look for info
  useEffect(() => {
    getAllCollabs();
    //setLoading(false);
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

  //* COLLAB DETAIL
  //DO modal window open DETAILS
  const handleClickModalWindowOpenDetails = async (id) => {
    try {
      const response = await getCollabDetailsService(id);
      const { name, description, registerUrl, logo, visibility } = response.data;
      setName(name);
      setDescription(description);
      setRegisterUrl(registerUrl);
      setLogo(logo);
      setVisibility(visibility);

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
  //! COLLAB DETAIL

  //* COLLAB ADD
  //DO modal window open ADD
  const handleClickModalWindowOpenAdd = () => {
    setName("");
    setDescription("");
    setRegisterUrl("");
    setLogo("");
    setVisibility("");

    setErrorMessage("");
    setModalWindowStatusAdd(true);
  };

  //DO routine ADD
  const handleClickSubmitAdd = async () => {
    try {
      const newCause = { name, description, registerUrl, logo };
      await postCollabService(newCause);
      getAllCollabs();
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
  //! COLLAB ADD

  //* COLLAB UPDATE
  //DO modal window open UPDATE
  const handleClickModalWindowOpenPatch = async (id) => {
    try {
      const response = await getCollabDetailsService(id);
      const { name, description, registerUrl, logo, visibility } = response.data;
      setPatchId(id);
      setName(name);
      setDescription(description);
      setRegisterUrl(registerUrl);
      setLogo(logo);
      setVisibility(visibility);

      setErrorMessage("");
      setModalWindowStatusPatch(true);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setErrorMessage(err.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  //DO routine UPDATE
  const handleClickSubmitPatch = async () => {
    try {
      await patchCollabService(patchId, { name, description, registerUrl, logo, visibility });
      getAllCollabs();
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
  //! COLLAB UPDATE

  //* COLLAB DELETE
  //DO modal window open DELETE
  const handleClickModalWindowOpenDelete = async (id) => {
    try {
      const response = await getCollabDetailsService(id);
      const { name, description, registerUrl, logo, visibility } = response.data;
      setDeleteId(id);
      setName(name);
      setDescription(description);
      setRegisterUrl(registerUrl);
      setLogo(logo);
      setVisibility(visibility);
      
      setErrorMessage("");
      setModalWindowStatusDelete(true);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setErrorMessage(err.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  //DO DELETE routine
  const handleClickSubmitDelete = async () => {
    try {
      await deleteCollabService(deleteId);
      getAllCollabs();
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
  //! COLLAB DELETE

  //DO use loading system to prevent errors
  if (!allCollabs) {
    return ( <div><br /><br /><ClipLoader color="red" size={50} /></div> );
  }

  return (
    <div className="data-list">
      <h1>Collaborators</h1>

      {isLoggedIn && (
        <Button onClick={handleClickModalWindowOpenAdd} variant="outlined" style={{ marginBottom: "30px" }}>
          Add new collaborator
        </Button>
      )}

      {/* Begin modal window all collaborator list */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 300 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Avatar</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="center">View</TableCell>
              {isLoggedIn && <TableCell align="center">Edit</TableCell>}
              {isLoggedIn && <TableCell align="center">Del</TableCell>}
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
                      <Button onClick={() => handleClickModalWindowOpenDetails(eachCollab._id)} style={{ maxWidth: "30px", maxHeight: "30px", minWidth: "30px", minHeight: "30px" }}>
                        <FontAwesomeIcon icon={faEye} color={"green"} />
                      </Button>
                    </Tooltip>
                  </TableCell>
                  {isLoggedIn && (
                    <TableCell align="center">
                      <Tooltip title="Update">
                        <Button onClick={() => handleClickModalWindowOpenPatch(eachCollab._id)} style={{ maxWidth: "30px", maxHeight: "30px", minWidth: "30px", minHeight: "30px" }}>
                          <FontAwesomeIcon icon={faPencil} color={"blue"} />
                        </Button>
                      </Tooltip>
                    </TableCell>
                  )}
                  {isLoggedIn && (
                    <TableCell align="center">
                      <Tooltip title="Delete">
                        <Button onClick={() => handleClickModalWindowOpenDelete(eachCollab._id)} style={{ maxWidth: "30px", maxHeight: "30px", minWidth: "30px", minHeight: "30px" }}>
                          <FontAwesomeIcon icon={faEraser} color={"red"} />
                        </Button>
                      </Tooltip>
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* End modal window all collaborator list*/}

      {/* Begin modal window collaborator detail */}
      <Dialog open={modalWindowStatusDetails} onClose={handleClickModalWindowCloseDetails}>
        <DialogContent>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia component="img" height="140" image={logo} alt="charity image" />
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
                <Button onClick={handleClickModalWindowCloseDetails} size="small" variant="outlined" sx={{ backgroundColor: "lightBlue" }}>
                  Turn back
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
      {/* End modal window collaborator detail*/}

      {/* Begin modal window collaborator add */}
      <Dialog open={modalWindowStatusAdd} onClose={handleClickModalWindowCloseAdd}>
        <DialogTitle>Add new collaborator</DialogTitle>
        <DialogContent>
          <FormControl>
            {errorMessage && (
              <Stack sx={{ width: "100%", marginBottom: "1rem" }} spacing={2}>
                <Alert severity="error">{errorMessage}</Alert>
              </Stack>
            )}

            <TextField label="Collaborator name:* " name="name" id="name" value={name} aria-describedby="name-helper-text" onChange={handleName} />
            <FormHelperText id="name-helper-text"> Collaborator name (required) </FormHelperText>

            <TextField label="Description:* " name="description" id="description" value={description} aria-describedby="description-helper-text" onChange={handleDescription} />
            <FormHelperText id="description-helper-text"> Collaborator description (required) </FormHelperText>

            <TextField label="Register URL: " name="registerUrl" id="registerUrl" value={registerUrl} aria-describedby="uregisterUrlrl-helper-text" onChange={handleRegisterUrl} />
            <FormHelperText id="registerUrl-helper-text"> Register URL </FormHelperText>

            <TextField label="Logo: " name="logo" id="logo" value={logo} aria-describedby="logo-helper-text" onChange={handleLogo} />
            <FormHelperText id="logo-helper-text"> Collaborator logo </FormHelperText>

            <DialogActions>
              <Button type="submit" onClick={handleClickSubmitAdd} size="small" variant="outlined" sx={{ backgroundColor: "lightGreen" }}>
                Add
              </Button>
              <Button type="submit" onClick={handleClickModalWindowCloseAdd} size="small" variant="outlined" sx={{ backgroundColor: "lightBlue" }}>
                Cancel
              </Button>
            </DialogActions>
          </FormControl>
        </DialogContent>
      </Dialog>
      {/* End modal window collaborator add */}

      {/* Begin modal window collaborator update */}
      <Dialog open={modalWindowStatusPatch} onClose={handleClickModalWindowClosePatch}>
        <DialogTitle>Update collaborator</DialogTitle>
        <DialogContent>
          <FormControl>
            {errorMessage && (
              <Stack sx={{ width: "100%", marginBottom: "1rem" }} spacing={2}>
                <Alert severity="error">{errorMessage}</Alert>
              </Stack>
            )}

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
              <Button type="submit" onClick={handleClickSubmitPatch} size="small" variant="outlined" sx={{ backgroundColor: "lightGreen" }}>
                Save
              </Button>
              <Button type="submit" onClick={handleClickModalWindowClosePatch} size="small" variant="outlined" sx={{ backgroundColor: "lightBlue" }}>
                Cancel
              </Button>
            </DialogActions>
          </FormControl>
        </DialogContent>
      </Dialog>
      {/* End modal window collaborator update */}

      {/* Begin modal window collaborator delete */}
      <Dialog open={modalWindowStatusDelete} onClose={handleClickModalWindowCloseDelete} sx={{ backgroundColor: "red" }}>
        <DialogTitle>Delete collaborator</DialogTitle>
        <DialogContent>
          <Card sx={{ maxWidth: 345 }}>
            {errorMessage && (
              <Stack sx={{ width: "100%", marginBottom: "1rem" }} spacing={2}>
                <Alert severity="error">{errorMessage}</Alert>
              </Stack>
            )}

            <CardMedia component="img" height="140" image={logo} alt="charity image" />
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
      {/* End modal window collaborator delete */}
    </div>
  );
}

export default CollabList;
