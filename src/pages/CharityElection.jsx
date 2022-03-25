//DO import needed modules
import { getAllCharityElectionService, getCharityElectionDetailsService, addNewCharityElectionService, updateCharityElectionService, deleteCharityElectionService } from "../services/charityElection.services";
import { getAllCausesService } from "../services/cause.services";
import { getAllUsersService } from "../services/user.services";
import axios from "axios";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser, faPencil } from "@fortawesome/free-solid-svg-icons";
import { Alert, Button, Card, CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, MenuItem, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from "@mui/material";
import { AdapterDateFns, LocalizationProvider, DateTimePicker } from "@mui/lab";

function CharityElection() {
  //DO create a state to control info
  const [allCharityElectionsData, setAllCharityElections] = useState(null);
  const [allCausesData, setAllCausesData] = useState(null);
  const [allUsersData, setAllUsersData] = useState(null);

  const [charityElectionUpdateId, setCharityElectionUpdateId] = useState(null);
  const [charityElectionDeleteId, setCharityElectionDeleteId] = useState(null);

  const [ownerID, setOwnerID] = useState("");
  const handleOwnerID = (e) => {
    setOwnerID(e.target.value);
  };

  const [charityID, setCharityID] = useState("");
  const handleCharityID = (e) => {
    setCharityID(e.target.value);
  };

  const [date, setDate] = useState("");
  const handleDate = (e) => {
    setDate(e.target.value);
  };

  const [points, setPoints] = useState("");
  const handlePoints = (e) => {
    setPoints(e.target.value);
  };

  const [modalStatusWindowAdd, setModalStatusAdd] = useState(false); // addCause modal state
  const [modalStatusWindowUpdate, setModalStatusWindowUpdate] = useState(false); // updateCause modal state
  const [modalStatusWindowsDelete, setModalStatusWindowsDelete] = useState(false); // updateCause modal state

  const [errorMessage, setErrorMessage] = useState("");

  //DO navigator hook
  const navigate = useNavigate();

  //DO useEffect to look for info
  useEffect(() => {
    getAllCharityElections();
    getAllUsers();
    getAllCauses();
  }, []);

  //DO async functions to obtain Charity Elections, Users and Causes data from DB
  const getAllCharityElections = async () => {
    try {
      //? obtain info from DB
      const allCharityElectionsData = await getAllCharityElectionService();
      setAllCharityElections(allCharityElectionsData.data);
    } catch (err) {
      navigate("/error");
    }
  };

  const getAllUsers = async () => {
    try {
      //? obtain info from DB
      const allUsersData = await getAllUsersService();
      setAllUsersData(allUsersData.data);
    } catch (err) {
      navigate("/error");
    }
  };

  const getAllCauses = async () => {
    try {
      //? obtain info from DB
      const allCausesData = await getAllCausesService();
      setAllCausesData(allCausesData.data);
    } catch (err) {
      navigate("/error");
    }
  };

  //DO use loading system to prevent errors
  if (!allCharityElectionsData) {
    return <div>...Loading</div>;
  }

  //* CHARITY ELECTIONS ADD
  //DO charityElections ADD open modal window
  const handleClickAddCharityElectionOpen = () => {
    setOwnerID("");
    setCharityID("");
    setDate("");
    setPoints("");
    setErrorMessage("");
    setModalStatusAdd(true);
  };

  //DO charityElections ADD routine
  const handleAddCharityElectionSubmit = async () => {
    try {
      const newCharityElection = { ownerID, charityID, date, points };
      await addNewCharityElectionService(newCharityElection);
      getAllCharityElections();
      setModalStatusAdd(false);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setErrorMessage(err.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  //DO charityElections ADD close modal window
  const handleClickCharityElectionAddClose = () => {
    setErrorMessage("");
    setModalStatusAdd(false);
  };
  //! CHARITY ELECTIONS ADD

  //* CHARITY ELECTIONS UPDATE
  //DO charityElections UPDATE open modal window
  const handleClickUpdateCharityElectionOpen = async (id) => {
    try {
      const response = await getCharityElectionDetailsService(id);
      const { ownerID, charityID, date, points } = response.data;
      setCharityElectionUpdateId(id);
      setOwnerID(ownerID);
      setCharityID(charityID);
      setDate(date);
      setPoints(points);
      setErrorMessage("");
      setModalStatusWindowUpdate(true);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setErrorMessage(err.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  //DO charityElections UPDATE routine
  const handleClickUpdateSubmit = async () => {
    try {
      await updateCharityElectionService(charityElectionUpdateId, { ownerID, charityID, date, points });
      setModalStatusWindowUpdate(false);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setErrorMessage(err.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  //DO charityElections UPDATE close modal windows
  const handleClickCharityElectionUpdateClose = () => {
    setErrorMessage("");
    setModalStatusWindowUpdate(false);
  };
  //! CHARITY ELECTIONS UPDATE

  //* CHARITY ELECTIONS DELETE
  //DO charityElections DELETE open modal window
  const handleClickDeleteCharityElectionOpen = async (id) => {

    try {
      const response = await getCharityElectionDetailsService(id);
      const { ownerID, charityID, date, points } = response.data;
      setCharityElectionDeleteId(id);
      setOwnerID(ownerID);
      setCharityID(charityID);
      setDate(date);
      setPoints(points);
      setErrorMessage("");
      setModalStatusWindowsDelete(true);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setErrorMessage(err.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  //DO charityElections DELETE routine
  const handleClickDeleteCharityElectionSubmit = async () => {
    try {
      await deleteCharityElectionService(charityElectionDeleteId);
      getAllCharityElections();
      setModalStatusWindowsDelete(false);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setErrorMessage(err.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  //DO charityElections DELETE close modal window
  const handleClickDeleteCharityElectionClose = () => {
    setErrorMessage("");
    setModalStatusWindowsDelete(false);
  };
  //! CHARITY ELECTIONS DELETE

  return (
    <div className="charity-data-list">
      <h1>Charity election</h1>
      {/* <p>{errorMessage}</p> */}
      <Button onClick={handleClickAddCharityElectionOpen} variant="outlined" style={{ marginBottom: "30px" }}>
        Add new charity election
      </Button>

      {/* Begin all Charity Elections list */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 300 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Associate</TableCell>
              <TableCell>Charity Cause</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Points</TableCell>
              <TableCell align="center">E</TableCell>
              <TableCell align="center">D</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allCharityElectionsData.map((eachCharityElection, index) => {
              return (
                <TableRow key={index + eachCharityElection.ownerID} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell align="center" component="th" scope="row">
                    {/* <Typography>{eachCharityElection.ownerID.username}</Typography> */}
                  </TableCell>
                  <TableCell>
                    <Typography>{eachCharityElection.charityID.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography align="center">{eachCharityElection.date}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography align="center">{eachCharityElection.points}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Update">
                      <Button onClick={() => handleClickUpdateCharityElectionOpen(eachCharityElection._id)} style={{ maxWidth: "30px", maxHeight: "30px", minWidth: "30px", minHeight: "30px" }}>
                        <FontAwesomeIcon icon={faPencil} color={"blue"} />
                      </Button>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Delete">
                      <Button onClick={() => handleClickDeleteCharityElectionOpen(eachCharityElection._id)} style={{ maxWidth: "30px", maxHeight: "30px", minWidth: "30px", minHeight: "30px" }}>
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
      {/* End all Charity Elections list*/}

      {/* Begin modal window charity election add */}
      <Dialog open={modalStatusWindowAdd} onClose={handleClickCharityElectionAddClose}>
        <DialogTitle>Add new charity election</DialogTitle>
        <DialogContent>
          {errorMessage && (
            <Stack sx={{ width: "100%", marginBottom: "1rem" }} spacing={2}>
              <Alert severity="error">{errorMessage}</Alert>
            </Stack>
          )}

          <FormControl>
            <Select value={ownerID} name="ownerID" id="ownerID" onChange={handleOwnerID} displayEmpty>
              <MenuItem value="" disabled>
                Select Owner
              </MenuItem>
              {allUsersData.map((eachUser) => {
                return (
                  <MenuItem key={eachUser._id} value={eachUser._id}>
                    {eachUser.username}
                  </MenuItem>
                );
              })}
            </Select>
            <TextField type="number" label="Points:* " name="points" id="points" value={points} aria-describedby="points-helper-text" onChange={handlePoints} />
            <FormHelperText id="points-helper-text"> Select desired points (max. 10) </FormHelperText>
          </FormControl>

          <FormControl>
            <Select value={charityID} name="charityID" id="charityID" onChange={handleCharityID} displayEmpty>
              <MenuItem value="" disabled>
                Select Charity Cause
              </MenuItem>
              {allCausesData.map((eachCause) => {
                return (
                  <MenuItem key={eachCause._id} value={eachCause._id}>
                    {eachCause.name}
                  </MenuItem>
                );
              })}
            </Select>
            <TextField label="Date:* " name="date" id="date" value={date} aria-describedby="date-helper-text" onChange={handleDate} />
            <FormHelperText id="date-helper-text"> Date since when will be effective </FormHelperText>

            <DialogActions>
              <Button type="submit" onClick={handleAddCharityElectionSubmit} size="small" variant="outlined" sx={{ backgroundColor: "lightGreen" }}>
                Add
              </Button>
              <Button type="submit" onClick={handleClickCharityElectionAddClose} size="small" variant="outlined" sx={{ backgroundColor: "lightBlue" }}>
                Cancel
              </Button>
            </DialogActions>
          </FormControl>
        </DialogContent>
      </Dialog>
      {/* End modal window charity election add */}

      {/* Begin modal window charity election update */}
      <Dialog open={modalStatusWindowUpdate} onClose={handleClickCharityElectionUpdateClose}>
        <DialogTitle>Update Charity Election</DialogTitle>
        <DialogContent>
          {errorMessage && (
            <Stack sx={{ width: "100%", marginBottom: "1rem" }} spacing={2}>
              <Alert severity="error">{errorMessage}</Alert>
            </Stack>
          )}

          <FormControl>
            <Select value={ownerID} name="ownerID" id="ownerID" onChange={handleOwnerID} displayEmpty>
              <MenuItem value="" disabled>
                Select Owner
              </MenuItem>
              {allUsersData.map((eachUser) => {
                return (
                  <MenuItem key={eachUser._id} value={eachUser._id}>
                    {eachUser.username}
                  </MenuItem>
                );
              })}
            </Select>
            <TextField type="number" label="Points:* " name="points" id="points" value={points} aria-describedby="points-helper-text" onChange={handlePoints} />
            <FormHelperText id="points-helper-text"> Select desired points (max. 10) </FormHelperText>
          </FormControl>

          <FormControl>
            <Select value={charityID} name="charityID" id="charityID" onChange={handleCharityID} displayEmpty>
              <MenuItem value="" disabled>
                Select Charity Cause
              </MenuItem>
              {allCausesData.map((eachCause) => {
                return (
                  <MenuItem key={eachCause._id} value={eachCause._id}>
                    {eachCause.name}
                  </MenuItem>
                );
              })}
            </Select>
            <TextField label="Date:* " name="date" id="date" value={date} aria-describedby="date-helper-text" onChange={handleDate} />
            <FormHelperText id="date-helper-text"> Date since when will be effective </FormHelperText>

            <DialogActions>
              <Button type="submit" onClick={handleClickUpdateSubmit} size="small" variant="outlined" sx={{ backgroundColor: "lightGreen" }}>
                Add
              </Button>
              <Button type="submit" onClick={handleClickCharityElectionUpdateClose} size="small" variant="outlined" sx={{ backgroundColor: "lightBlue" }}>
                Cancel
              </Button>
            </DialogActions>
          </FormControl>
        </DialogContent>
      </Dialog>
      {/* End modal window charity election update */}


      {/* Begin modal window charity election delete */}
      <Dialog open={modalStatusWindowsDelete} onClose={handleClickDeleteCharityElectionClose} sx={{ backgroundColor: "red" }}>
        <DialogTitle>Delete Charity Election</DialogTitle>
        <DialogContent>
          <Card sx={{ maxWidth: 345 }}>
          {errorMessage && (<Stack sx={{ width: "100%", marginBottom: "1rem" }} spacing={2}><Alert severity="error">{errorMessage}</Alert></Stack>)}

            {/* <CardMedia component="img" height="140" image={logo} alt="charitable cause image" /> */}
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Owner: {ownerID}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Charity cause: {charityID}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Date: {date}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Points: {points}
              </Typography>
              <Stack sx={{ width: "100%", marginTop: "1rem", marginBottom: "1rem" }} spacing={2}>
                <Alert severity="error">{"ATTENTION! This action can not be undone!"}</Alert>
              </Stack>
              <CardActions>
                <Button onClick={() => handleClickDeleteCharityElectionSubmit(charityElectionDeleteId)} size="small" variant="outlined" sx={{ backgroundColor: "red" }}>
                  Delete
                </Button>
                <Button onClick={handleClickDeleteCharityElectionClose} size="small" variant="outlined" sx={{ backgroundColor: "lightBlue" }}>
                  Cancel
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
      {/* End modal window charity election delete */}
    </div>
  );
}

export default CharityElection;
