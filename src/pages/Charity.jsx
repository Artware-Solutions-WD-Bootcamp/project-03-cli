//DO import needed modules
import { getAllCharitiesService, getCharityDetailsService, postCharityService, patchCharityService, deleteCharityService } from "../services/charity.services";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser, faEye, faPencil } from "@fortawesome/free-solid-svg-icons";
import { Avatar, Alert, Button, Card, CardActions, CardContent, CardMedia, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, Link, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from "@mui/material";
import { ClipLoader } from "react-spinners";

function CharitiesList(props) {
  const { isLoggedIn } = props;

  //DO create states to control info
  const [modalWindowStatusDetails, setModalWindowStatusDetails] = useState(false);
  const [modalWindowStatusAdd, setModalWindowStatusAdd] = useState(false);
  const [modalWindowStatusPatch, setModalWindowStatusPatch] = useState(false);
  const [modalWindowStatusDelete, setModalWindowStatusDelete] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  //const [loading, setLoading] = useState(true);

  const [patchId, setPatchId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [allCharities, setAllCharities] = useState(null);

  const [name, setName] = useState("");
  const handleName = (e) => {
    setName(e.target.value);
  };

  const [description, setDescription] = useState("");
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const [url, setUrl] = useState("");
  const handleUrl = (e) => {
    setUrl(e.target.value);
  };

  const [logo, setLogo] = useState("");
  const handleLogo = (e) => {
    setLogo(e.target.value);
  };

  const [active, setActive] = useState(true);
  const handleActive = (e) => {
    setActive(e.target.checked);
  };

  const [visible, setVisible] = useState(true);
  const handleVisible = (e) => {
    setVisible(e.target.checked);
  };

  const [assignedAmount, setAssignedAmount] = useState("");
  const handleAssignedAmount = (e) => {
    setAssignedAmount(e.target.value);
  };

  const [deliveryProof, setDeliveryProof] = useState("");
  const handleDeliveryProof = (e) => {
    setDeliveryProof(e.target.value);
  };

  //DO navigator hook
  const navigate = useNavigate();

  //DO useEffect to look for info
  useEffect(() => {
    getAllCharities();
    //setLoading(false);
  }, []);

  //DO async function to obtain data from DB
  const getAllCharities = async () => {
    try {
      //? obtain info from DB
      const response = await getAllCharitiesService();
      setAllCharities(response.data);
    } catch (err) {
      navigate("/error");
    }
  };

  //* CAUSE DETAILS
  //DO modal window open DETAILS
  const handleClickModalWindowOpenDetails = async (id) => {
    try {
      const response = await getCharityDetailsService(id);
      const { name, description, url, logo, active, visible, assignedAmount, deliveryProof } = response.data;
      setName(name);
      setDescription(description);
      setUrl(url);
      setLogo(logo);
      setActive(active);
      setVisible(visible);
      setAssignedAmount(assignedAmount);
      setDeliveryProof(deliveryProof);

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
  //! CAUSE DETAILS

  //* CAUSE ADD
  //DO modal window open ADD
  const handleClickModalWindowOpenAdd = () => {
    setName("");
    setDescription("");
    setUrl("");
    setLogo("");

    setErrorMessage("");
    setModalWindowStatusAdd(true);
  };

  //DO routine ADD
  const handleClickSubmitAdd = async () => {
    try {
      const newCharity = { name, description, url, logo };
      await postCharityService(newCharity);
      getAllCharities();
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
  //! CAUSE ADD

  //* CAUSE UPDATE
  //DO modal window open UPDATE
  const handleClickModalWindowOpenPatch = async (id) => {
    try {
      const response = await getCharityDetailsService(id);
      const { name, description, url, logo, active, visible, assignedAmount, deliveryProof } = response.data;
      setPatchId(id);
      setName(name);
      setDescription(description);
      setUrl(url);
      setLogo(logo);
      setActive(active);
      setVisible(visible);
      setAssignedAmount(assignedAmount);
      setDeliveryProof(deliveryProof);

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
      await patchCharityService(patchId, { name, description, url, logo, active, visible, assignedAmount, deliveryProof });
      getAllCharities();
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
  //! CAUSE UPDATE

  //* CAUSE DELETE
  //DO modal window open DELETE
  const handleClickModalWindowOpenDelete = async (id) => {
    try {
      const response = await getCharityDetailsService(id);
      const { name, description, url, logo, active, visible, assignedAmount, deliveryProof } = response.data;
      setDeleteId(id);
      setName(name);
      setDescription(description);
      setUrl(url);
      setLogo(logo);
      setActive(active);
      setVisible(visible);
      setAssignedAmount(assignedAmount);
      setDeliveryProof(deliveryProof);

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
      await deleteCharityService(deleteId);
      getAllCharities();
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
  //! CAUSE DELETE

  //DO use loading system to prevent errors
  if (!allCharities) {
    return ( <div><br /><br /><ClipLoader color="red" size={50} /></div> );
  }

  return (
    <div className="data-list">
      <h1>Charitable Causes</h1>

      {isLoggedIn && (
        <Button onClick={handleClickModalWindowOpenAdd} variant="outlined" style={{ marginBottom: "30px" }}>
          Add new charitable cause
        </Button>
      )}

      {/* Begin modal window all charities list */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 300 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Logo</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="center">View</TableCell>
              {isLoggedIn && <TableCell align="center">Edit</TableCell>}
              {isLoggedIn && <TableCell align="center">Del</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {allCharities.map((eachCharity, index) => {
              return (
                <TableRow key={index + eachCharity.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell align="center" component="th" scope="row">
                    <Avatar src={eachCharity.logo} alt="logo" />
                  </TableCell>
                  <TableCell>{eachCharity.name}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="View details">
                      <Button onClick={() => handleClickModalWindowOpenDetails(eachCharity._id)} style={{ maxWidth: "30px", maxHeight: "30px", minWidth: "30px", minHeight: "30px" }}>
                        <FontAwesomeIcon icon={faEye} color={"green"} />
                      </Button>
                    </Tooltip>
                  </TableCell>
                  {isLoggedIn && (
                    <TableCell align="center">
                      <Tooltip title="Patch">
                        <Button onClick={() => handleClickModalWindowOpenPatch(eachCharity._id)} style={{ maxWidth: "30px", maxHeight: "30px", minWidth: "30px", minHeight: "30px" }}>
                          <FontAwesomeIcon icon={faPencil} color={"blue"} />
                        </Button>
                      </Tooltip>
                    </TableCell>
                  )}
                  {isLoggedIn && (
                    <TableCell align="center">
                      <Tooltip title="Delete">
                        <Button onClick={() => handleClickModalWindowOpenDelete(eachCharity._id)} style={{ maxWidth: "30px", maxHeight: "30px", minWidth: "30px", minHeight: "30px" }}>
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
      {/* End modal window all charities list*/}

      {/* Begin modal window charity detail */}
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
                <Button onClick={handleClickModalWindowCloseDetails} size="small" variant="outlined" sx={{ backgroundColor: "lightBlue" }}>
                  Turn back
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
      {/* End modal window charity detail*/}

      {/* Begin modal window charity add */}
      <Dialog open={modalWindowStatusAdd} onClose={handleClickModalWindowCloseAdd}>
        <DialogTitle>Add new charitable cause</DialogTitle>
        <DialogContent>
          {errorMessage && (
            <Stack sx={{ width: "100%", marginBottom: "1rem" }} spacing={2}>
              <Alert severity="error">{errorMessage}</Alert>
            </Stack>
          )}
          <FormControl>
            <TextField label="Charity Name:* " name="name" id="name" value={name} aria-describedby="name-helper-text" onChange={handleName} />
            <FormHelperText id="name-helper-text"> The charitable cause name (required) </FormHelperText>

            <TextField label="Description:* " name="description" id="description" value={description} aria-describedby="description-helper-text" onChange={handleDescription} />
            <FormHelperText id="description-helper-text"> Description of the cause (required) </FormHelperText>

            <TextField label="URL: " name="url" id="url" value={url} aria-describedby="url-helper-text" onChange={handleUrl} />
            <FormHelperText id="url-helper-text"> The URL of the entity which will receive the charity donation </FormHelperText>

            <TextField label="Logo: " name="logo" id="logo" value={logo} aria-describedby="logo-helper-text" onChange={handleLogo} />
            <FormHelperText id="logo-helper-text"> Charity cover image </FormHelperText>

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
      {/* End modal window charity add */}

      {/* Begin modal window charity patch */}
      <Dialog open={modalWindowStatusPatch} onClose={handleClickModalWindowClosePatch}>
        <DialogTitle>Update charitable cause</DialogTitle>
        <DialogContent>
          <FormControl>
            {errorMessage && (
              <Stack sx={{ width: "100%", marginBottom: "1rem" }} spacing={2}>
                <Alert severity="error">{errorMessage}</Alert>
              </Stack>
            )}
            <TextField label="Charity name:* " name="name" id="name" value={name} aria-describedby="name-helper-text" onChange={handleName} />
            <FormHelperText id="name-helper-text"> The charitable cause name (required) </FormHelperText>

            <TextField label="Description:* " name="description" id="description" value={description} aria-describedby="description-helper-text" onChange={handleDescription} />
            <FormHelperText id="description-helper-text"> Description of the cause (required) </FormHelperText>

            <TextField label="URL: " name="url" id="url" value={url} aria-describedby="url-helper-text" onChange={handleUrl} />
            <FormHelperText id="url-helper-text"> The URL of the entity which will receive the charity donation </FormHelperText>

            <TextField label="Logo: " name="logo" id="logo" value={logo} aria-describedby="logo-helper-text" onChange={handleLogo} />
            <FormHelperText id="logo-helper-text"> Charity cover image </FormHelperText>

            <Typography variant="body2" color="text.secondary">
              Active: <Checkbox checked={active} onChange={handleActive} />
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Visible: <Checkbox checked={visible} onChange={handleVisible} />
            </Typography>

            <TextField label="Assigned amount: " name="assignedAmount" id="assignedAmount" value={assignedAmount} aria-describedby="assignedAmount-helper-text" onChange={handleAssignedAmount} />
            <FormHelperText id="assignedAmount-helper-text"> Charity assigned amount </FormHelperText>

            <TextField label="Delivery proof: " name="deliveryProof" id="deliveryProof" value={deliveryProof} aria-describedby="deliveryProof-helper-text" onChange={handleDeliveryProof} />
            <FormHelperText id="deliveryProof-helper-text"> Proof of donation delivery </FormHelperText>

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
      {/* End modal window charity patch */}

      {/* Begin modal window charity delete */}
      <Dialog open={modalWindowStatusDelete} onClose={handleClickModalWindowCloseDelete} sx={{ backgroundColor: "red" }}>
        <DialogTitle>Delete charitable cause</DialogTitle>
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
      {/* End modal window charity delete */}
    </div>
  );
}

export default CharitiesList;
