//DO import needed services
import { getAllCausesService, addNewCauseService, getCauseDetailsService, updateCauseService, deleteCauseService } from "../services/cause.services";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser, faEye, faPencil } from "@fortawesome/free-solid-svg-icons";
import { Avatar, Alert, Button, Card, CardActions, CardContent, CardMedia, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, Link, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from "@mui/material";

function CausesList() {
  //DO create a state to control info
  const [allCauses, setAllCauses] = useState(null); // allCauses array

  const [causeUpdateId, setCauseUpdateId] = useState(null);
  const [causeDeleteId, setCauseDeleteId] = useState(null);

  const [name, setName] = useState(""); // for CausesList
  const handleName = (e) => {
    setName(e.target.value);
  };

  const [description, setDescription] = useState(""); // for CausesList
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const [url, setUrl] = useState(""); // for CausesList
  const handleUrl = (e) => {
    setUrl(e.target.value);
  };

  const [logo, setLogo] = useState(""); // for CausesList
  const handleLogo = (e) => {
    setLogo(e.target.value);
  };

  const [active, setActive] = useState(""); // for CausesDetails and CausesUpdate
  const handleActive = (e) => {
    setActive(e.target.checked);
  };

  const [visible, setVisible] = useState(""); // for CausesDetails and CausesUpdate
  const handleVisible = (e) => {
    setVisible(e.target.checked);
  };

  const [assignedAmount, setAssignedAmount] = useState(""); // for CausesDetails and CausesUpdate
  const handleAssignedAmount = (e) => {
    setAssignedAmount(e.target.value);
  };

  const [deliveryProof, setDeliveryProof] = useState(""); // for CausesDetails and CausesUpdate
  const handleDeliveryProof = (e) => {
    setDeliveryProof(e.target.value);
  };

  const [modalStatusCauseDetail, setModalStatusCauseDetail] = useState(false); // updateCause modal state
  const [modalStatusCauseAdd, setModalStatusCauseAdd] = useState(false); // addCause modal state
  const [modalStatusCauseUpdate, setModalStatusCauseUpdate] = useState(false); // updateCause modal state
  const [modalStatusCauseDelete, setModalStatusCauseDelete] = useState(false); // updateCause modal state

  const [errorMessage, setErrorMessage] = useState("");

  //DO navigator hook
  const navigate = useNavigate();

  //DO useEffect to look for info
  useEffect(() => {
    getAllCauses();
  }, []);

  //DO async function to obtain all causes data from DB
  const getAllCauses = async () => {
    try {
      //? obtain info from DB
      const response = await getAllCausesService();
      setAllCauses(response.data);
    } catch (err) {
      navigate("/error");
    }
  };

  //DO use loading system to prevent errors
  if (!allCauses) {
    return <div>...Loading</div>;
  }

  //* CAUSE DETAIL
  //DO cause DETAIL open modal window
  const handleClickDetailCauseOpen = async (id) => {
    try {
      const response = await getCauseDetailsService(id);
      const { name, description, url, logo, active, visible, assignedAmount, deliveryProof } = response.data;
      setName(name);
      setDescription(description);
      setUrl(url);
      setLogo(logo);
      setActive(active);
      setVisible(visible);
      setAssignedAmount(assignedAmount);
      setDeliveryProof(deliveryProof);
      setModalStatusCauseDetail(true);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setErrorMessage(err.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  //DO cause DETAIL close modal window
  const handleClickDetailCauseClose = () => {
    setModalStatusCauseDetail(false);
  };
  //! CAUSE DETAIL

  //* CAUSE ADD
  //DO cause ADD open modal window
  const handleClickAddCauseOpen = () => {
    setErrorMessage("");
    setName("");
    setDescription("");
    setUrl("");
    setLogo("");
    setModalStatusCauseAdd(true);
  };

  //DO cause ADD routine
  const handleAddCauseSubmit = async () => {
    try {
      const newCause = { name, description, url, logo };
      await addNewCauseService(newCause);
      getAllCauses();
      setModalStatusCauseAdd(false);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setErrorMessage(err.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  //DO cause ADD close modal window
  const handleClickCauseAddClose = () => {
    setErrorMessage("");
    setModalStatusCauseAdd(false);
  };
  //! CAUSE ADD

  //* CAUSE UPDATE
  //DO cause UPDATE open modal window
  const handleClickUpdateCauseOpen = async (id) => {
    try {
      const response = await getCauseDetailsService(id);
      const { name, description, url, logo, active, visible, assignedAmount, deliveryProof } = response.data;
      setCauseUpdateId(id);
      setName(name);
      setDescription(description);
      setUrl(url);
      setLogo(logo);
      setActive(active);
      setVisible(visible);
      setAssignedAmount(assignedAmount);
      setDeliveryProof(deliveryProof);
      setErrorMessage("");
      setModalStatusCauseUpdate(true);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setErrorMessage(err.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  //DO cause UPDATE routine
  const handleClickUpdateSubmit = async () => {
    try {
      await updateCauseService(causeUpdateId, { name, description, url, logo, active, visible, assignedAmount, deliveryProof });
      setModalStatusCauseUpdate(false);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setErrorMessage(err.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  //DO cause UPDATE close modal window
  const handleClickUpdateCauseClose = () => {
    setErrorMessage("");
    setModalStatusCauseUpdate(false);
  };
  //! CAUSE UPDATE

  //* CAUSE DELETE
  //DO cause DELETE open modal window
  const handleClickDeleteCauseOpen = async (id) => {
    try {
      const response = await getCauseDetailsService(id);
      const { name, description, url, logo, active, visible, assignedAmount, deliveryProof } = response.data;
      setCauseDeleteId(id);
      setName(name);
      setDescription(description);
      setUrl(url);
      setLogo(logo);
      setActive(active);
      setVisible(visible);
      setAssignedAmount(assignedAmount);
      setDeliveryProof(deliveryProof);
      setErrorMessage("");
      setModalStatusCauseDelete(true);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setErrorMessage(err.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  //DO cause DELETE routine
  const handleClickDeleteCauseSubmit = async () => {
    try {
      await deleteCauseService(causeDeleteId);
      getAllCauses();
      setModalStatusCauseDelete(false);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setErrorMessage(err.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  //DO cause DELETE close modal window
  const handleClickDeleteCauseClose = () => {
    setErrorMessage("");
    setModalStatusCauseDelete(false);
  };
  //! CAUSE DELETE

  return (
    <div className="data-list">
      <h1>Charitable Causes</h1>
      {/* <p>{errorMessage}</p> */}
      <Button onClick={handleClickAddCauseOpen} variant="outlined" style={{ marginBottom: "30px" }}>
        Add new charitable cause
      </Button>

      {/* Begin modal window all cause list */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 300 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Logo</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="center">View</TableCell>
              <TableCell align="center">Edit</TableCell>
              <TableCell align="center">Del</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allCauses.map((eachCause, index) => {
              return (
                <TableRow key={index + eachCause.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell align="center" component="th" scope="row">
                    <Avatar src={eachCause.logo} alt="logo" />
                  </TableCell>
                  <TableCell>{eachCause.name}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="View details">
                      <Button onClick={() => handleClickDetailCauseOpen(eachCause._id)} style={{ maxWidth: "30px", maxHeight: "30px", minWidth: "30px", minHeight: "30px" }}>
                        <FontAwesomeIcon icon={faEye} color={"green"} />
                      </Button>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Update">
                      <Button onClick={() => handleClickUpdateCauseOpen(eachCause._id)} style={{ maxWidth: "30px", maxHeight: "30px", minWidth: "30px", minHeight: "30px" }}>
                        <FontAwesomeIcon icon={faPencil} color={"blue"} />
                      </Button>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Delete">
                      <Button onClick={() => handleClickDeleteCauseOpen(eachCause._id)} style={{ maxWidth: "30px", maxHeight: "30px", minWidth: "30px", minHeight: "30px" }}>
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
      {/* End modal window all causes list*/}

      {/* Begin modal window cause detail */}
      <Dialog open={modalStatusCauseDetail} onClose={handleClickDetailCauseClose}>
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
              <hr />
              <Typography variant="body2" color="text.secondary">
                Assigned amount: {assignedAmount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Delivery proof: {deliveryProof}
              </Typography>
              <CardActions>
                <Link href={url} target="blank">
                  <Button size="small" variant="outlined" sx={{ backgroundColor: "lightGreen", marginRight: 2 }}>
                    Visit site
                  </Button>
                </Link>
                <Button onClick={handleClickDetailCauseClose} size="small" variant="outlined" sx={{ backgroundColor: "lightBlue" }}>
                  Turn back
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
      {/* End modal window cause detail*/}

      {/* Begin modal window cause add */}
      <Dialog open={modalStatusCauseAdd} onClose={handleClickCauseAddClose}>
        <DialogTitle>Add new charitable cause</DialogTitle>
        <DialogContent>
        {errorMessage && (<Stack sx={{ width: "100%", marginBottom: "1rem" }} spacing={2}><Alert severity="error">{errorMessage}</Alert></Stack>)}
          <FormControl>
            <TextField label="Cause name:* " name="name" id="name" value={name} aria-describedby="name-helper-text" onChange={handleName} />
            <FormHelperText id="name-helper-text"> The charitable cause name (required) </FormHelperText>

            <TextField label="Description:* " name="description" id="description" value={description} aria-describedby="description-helper-text" onChange={handleDescription} />
            <FormHelperText id="description-helper-text"> Description of the cause (required) </FormHelperText>

            <TextField label="URL: " name="url" id="url" value={url} aria-describedby="url-helper-text" onChange={handleUrl} />
            <FormHelperText id="url-helper-text"> The URL of the entity which will receive the donation of the cause </FormHelperText>

            <TextField label="Logo: " name="logo" id="logo" value={logo} aria-describedby="logo-helper-text" onChange={handleLogo} />
            <FormHelperText id="logo-helper-text"> Cause cover image </FormHelperText>

            <DialogActions>
              <Button type="submit" onClick={handleAddCauseSubmit} size="small" variant="outlined" sx={{ backgroundColor: "lightGreen" }}>
                Add
              </Button>
              <Button type="submit" onClick={handleClickCauseAddClose} size="small" variant="outlined" sx={{ backgroundColor: "lightBlue" }}>
                Cancel
              </Button>
            </DialogActions>
          </FormControl>
        </DialogContent>
      </Dialog>
      {/* End modal window cause add */}

      {/* Begin modal window cause update */}
      <Dialog open={modalStatusCauseUpdate} onClose={handleClickUpdateCauseClose}>
        <DialogTitle>Update charitable cause</DialogTitle>
        <DialogContent>
          <FormControl>
          {errorMessage && (<Stack sx={{ width: "100%", marginBottom: "1rem" }} spacing={2}><Alert severity="error">{errorMessage}</Alert></Stack>)}
            <TextField label="Cause name:* " name="name" id="name" value={name} aria-describedby="name-helper-text" onChange={handleName} />
            <FormHelperText id="name-helper-text"> The charitable cause name (required) </FormHelperText>

            <TextField label="Description:* " name="description" id="description" value={description} aria-describedby="description-helper-text" onChange={handleDescription} />
            <FormHelperText id="description-helper-text"> Description of the cause (required) </FormHelperText>

            <TextField label="URL: " name="url" id="url" value={url} aria-describedby="url-helper-text" onChange={handleUrl} />
            <FormHelperText id="url-helper-text"> The URL of the entity which will receive the donation of the cause </FormHelperText>

            <TextField label="Logo: " name="logo" id="logo" value={logo} aria-describedby="logo-helper-text" onChange={handleLogo} />
            <FormHelperText id="logo-helper-text"> Cause cover image </FormHelperText>

            <Typography variant="body2" color="text.secondary">
              Active: <Checkbox checked={active} onChange={handleActive} />
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Visible: <Checkbox checked={visible} onChange={handleVisible} />
            </Typography>

            <TextField label="Assigned amount: " name="assignedAmount" id="assignedAmount" value={assignedAmount} aria-describedby="assignedAmount-helper-text" onChange={handleAssignedAmount} />
            <FormHelperText id="assignedAmount-helper-text"> Cause assigned amount </FormHelperText>

            <TextField label="Delivery proof: " name="deliveryProof" id="deliveryProof" value={deliveryProof} aria-describedby="deliveryProof-helper-text" onChange={handleDeliveryProof} />
            <FormHelperText id="deliveryProof-helper-text"> Proof of donation delivery </FormHelperText>

            <DialogActions>
              <Button type="submit" onClick={handleClickUpdateSubmit} size="small" variant="outlined" sx={{ backgroundColor: "lightGreen" }}>
                Save
              </Button>
              <Button type="submit" onClick={handleClickUpdateCauseClose} size="small" variant="outlined" sx={{ backgroundColor: "lightBlue" }}>
                Cancel
              </Button>
            </DialogActions>
          </FormControl>
        </DialogContent>
      </Dialog>
      {/* End modal window cause update */}

      {/* Begin modal window cause delete */}
      <Dialog open={modalStatusCauseDelete} onClose={handleClickDeleteCauseClose} sx={{ backgroundColor: "red" }}>
        <DialogTitle>Delete charitable cause</DialogTitle>
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
                URL: {url}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Active: <Checkbox checked={active} />
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Visible: <Checkbox checked={visible} />
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Assigned amount: {assignedAmount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Delivery proof: {deliveryProof}
              </Typography>
              <Stack sx={{ width: "100%", marginTop: "1rem", marginBottom: "1rem" }} spacing={2}>
                <Alert severity="error">{"ATTENTION! This action can not be undone!"}</Alert>
              </Stack>
              <CardActions>
                <Button onClick={handleClickDeleteCauseSubmit} size="small" variant="outlined" sx={{ backgroundColor: "red" }}>
                  Delete
                </Button>
                <Button onClick={handleClickDeleteCauseClose} size="small" variant="outlined" sx={{ backgroundColor: "lightBlue" }}>
                  Cancel
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
      {/* End modal window cause delete */}
    </div>
  );
}

export default CausesList;
