//DO import needed modules
import { getAllCharityElectionsService, getCharityElectionDetailsService, postCharityElectionService, patchCharityElectionService, deleteCharityElectionService } from "../services/charityElection.services";
import { getAllCharitiesService } from "../services/charity.services";
import { getAllUsersService } from "../services/user.services";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser, faPencil } from "@fortawesome/free-solid-svg-icons";
import { Alert, Box, Button, Card, CardActions, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, MenuItem, Paper, Select, Slider, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from "@mui/material";
import { ClipLoader } from "react-spinners";

function CharityElection() {
  //DO create states to control info
  const [modalWindowStatusAdd, setModalWindowStatusAdd] = useState(false);
  const [modalWindowStatusPatch, setModalWindowStatusPatch] = useState(false);
  const [modalWindowStatusDelete, setModalWindowStatusDelete] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  //const [loading, setLoading] = useState(true);

  const [patchId, setPatchId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [allUsersData, setAllUsersData] = useState(null);
  const [allCharitiesData, setAllCharitiesData] = useState(null);
  const [allCharityElectionsData, setAllCharityElections] = useState(null);

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

  const [charityName, setCharityName] = useState("");
  const handleCharityName = (e) => {
    setPoints(e.target.value);
  };

  const [charityLogo, setCharityLogo] = useState("");
  const handleCharityLogo = (e) => {
    setPoints(e.target.value);
  };

  const [userName, setUserName] = useState("");
  const handleUserName = (e) => {
    setPoints(e.target.value);
  };

  //DO navigator hook
  const navigate = useNavigate();

  //DO useEffect to look for info
  useEffect(() => {
    getAllUsers();
    getAllCharities();
    getAllCharityElections();
    //setLoading(false);
  }, []);

  //DO async functions to obtain data from DB
  const getAllUsers = async () => {
    try {
      //? obtain info from DB
      const allUsersData = await getAllUsersService();
      setAllUsersData(allUsersData.data);
    } catch (err) {
      navigate("/error");
    }
  };

  const getAllCharities = async () => {
    try {
      //? obtain info from DB
      const allCharitiesData = await getAllCharitiesService();
      setAllCharitiesData(allCharitiesData.data);
    } catch (err) {
      navigate("/error");
    }
  };

  const getAllCharityElections = async () => {
    try {
      //? obtain info from DB
      const allCharityElectionsData = await getAllCharityElectionsService();
      setAllCharityElections(allCharityElectionsData.data);
    } catch (err) {
      navigate("/error");
    }
  };

  //* CHARITY ELECTIONS ADD
  //DO modal window open ADD
  const handleClickModalWindowOpenAdd = () => {
    setOwnerID("");
    setCharityID("");
    setDate("");
    setPoints("");

    setErrorMessage("");
    setModalWindowStatusAdd(true);
  };

  //DO routine ADD
  const handleClickSubmitAdd = async () => {
    try {
      const newCharityElection = { ownerID, charityID, date, points };
      await postCharityElectionService(newCharityElection);
      getAllCharityElections();
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
  //! CHARITY ELECTIONS ADD

  //* CHARITY ELECTIONS UPDATE
  //DO modal window open UPDATE
  const handleClickModalWindowOpenPatch = async (id) => {
    try {
      const response = await getCharityElectionDetailsService(id);
      const { ownerID, charityID, date, points } = response.data;
      setPatchId(id);
      setOwnerID(ownerID);
      setCharityID(charityID);
      setDate(date);
      setPoints(points);

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
      await patchCharityElectionService(patchId, { ownerID, charityID, date, points });
      getAllCharityElections();
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
  //! CHARITY ELECTIONS UPDATE

  //* CHARITY ELECTIONS DELETE
  //DO modal window open DELETE
  const handleClickModalWindowOpenDelete = async (id) => {
    try {
      const response = await getCharityElectionDetailsService(id);
      const { ownerID, charityID, date, points, charityName, charityLogo, userName } = response.data;
      setDeleteId(id);
      setOwnerID(ownerID);
      setCharityID(charityID);
      setDate(date);
      setPoints(points);
      setCharityName(charityName);
      setCharityLogo(charityLogo);
      setUserName(userName);

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
      await deleteCharityElectionService(deleteId);
      getAllCharityElections();
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
  //! CHARITY ELECTIONS DELETE

  //DO use loading system to prevent errors
  if (!allUsersData || !allCharitiesData || !allCharityElectionsData) {
    return (
      <div>
        <br />
        <br />
        <ClipLoader color="red" size={50} />
      </div>
    );
  }

  return (
    <div className="charity-data-list">
      <h1>Charity election</h1>
      {/* <p>{errorMessage}</p> */}
      <Button onClick={handleClickModalWindowOpenAdd} variant="outlined" style={{ marginBottom: "30px" }}>
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
              <TableCell align="center">Pts</TableCell>
              <TableCell align="center">Edit</TableCell>
              <TableCell align="center">Del</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allCharityElectionsData.map((eachCharityElection, index) => {
              return (
                <TableRow key={index + eachCharityElection.ownerID} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell align="center" component="th" scope="row">
                    <Typography>{eachCharityElection.ownerID.username}</Typography>
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
                      <Button onClick={() => handleClickModalWindowOpenPatch(eachCharityElection._id)} style={{ maxWidth: "30px", maxHeight: "30px", minWidth: "30px", minHeight: "30px" }}>
                        <FontAwesomeIcon icon={faPencil} color={"blue"} />
                      </Button>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Delete">
                      <Button onClick={() => handleClickModalWindowOpenDelete(eachCharityElection._id)} style={{ maxWidth: "30px", maxHeight: "30px", minWidth: "30px", minHeight: "30px" }}>
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
      <Dialog open={modalWindowStatusAdd} onClose={handleClickModalWindowCloseAdd}>
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

            <Box sx={{ paddingLeft: 2, paddingRight: 2, marginTop: 1 }}>
              <Typography>Points:</Typography>
              <Slider aria-label="Points:" valueLabelDisplay="auto" step={1} marks min={1} max={10} name="points" id="points" value={points} onChange={handlePoints} />
              <FormHelperText id="points-helper-text"> Select desired points (between 1-10) </FormHelperText>
            </Box>
          </FormControl>

          <FormControl>
            <Select value={charityID} name="charityID" id="charityID" onChange={handleCharityID} displayEmpty>
              <MenuItem value="" disabled>
                Select Charity Cause
              </MenuItem>
              {allCharitiesData.map((eachCharity) => {
                return (
                  <MenuItem key={eachCharity._id} value={eachCharity._id}>
                    {eachCharity.name}
                  </MenuItem>
                );
              })}
            </Select>
            <TextField label="Date:* " name="date" id="date" value={date} aria-describedby="date-helper-text" onChange={handleDate} />
            <FormHelperText id="date-helper-text"> Date since when will be effective </FormHelperText>
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
      {/* End modal window charity election add */}

      {/* Begin modal window charity election update */}
      <Dialog open={modalWindowStatusPatch} onClose={handleClickModalWindowClosePatch}>
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

            <Box sx={{ paddingLeft: 2, paddingRight: 2, marginTop: 1 }}>
              <Typography>Points:</Typography>
              <Slider aria-label="Points:" defaultValue={points} valueLabelDisplay="auto" step={1} marks min={1} max={10} name="points" id="points" value={points} onChange={handlePoints} />
              <FormHelperText id="points-helper-text"> Select desired points (between 1-10) </FormHelperText>
            </Box>
          </FormControl>

          <FormControl>
            <Select value={charityID} name="charityID" id="charityID" onChange={handleCharityID} displayEmpty>
              <MenuItem value="" disabled>
                Select Charity Cause
              </MenuItem>
              {allCharitiesData.map((eachCharity) => {
                return (
                  <MenuItem key={eachCharity._id} value={eachCharity._id}>
                    {eachCharity.name}
                  </MenuItem>
                );
              })}
            </Select>
            <TextField label="Date:* " name="date" id="date" value={date} aria-describedby="date-helper-text" onChange={handleDate} />
            <FormHelperText id="date-helper-text"> Date since when will be effective </FormHelperText>

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
      {/* End modal window charity election update */}

      {/* Begin modal window charity election delete */}
      <Dialog open={modalWindowStatusDelete} onClose={handleClickModalWindowCloseDelete} sx={{ backgroundColor: "red" }}>
        <DialogTitle>Delete Charitable Election</DialogTitle>
        <DialogContent>
          <Card sx={{ maxWidth: 345 }}>
            {errorMessage && (
              <Stack sx={{ width: "100%", marginBottom: "1rem" }} spacing={2}>
                <Alert severity="error">{errorMessage}</Alert>
              </Stack>
            )}

            <CardMedia component="img" height="140" image={charityLogo} alt="charitable cause image" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Owner: {userName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Charitable cause: {charityName}
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
                <Button onClick={() => handleClickSubmitDelete(deleteId)} size="small" variant="outlined" sx={{ backgroundColor: "red" }}>
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
      {/* End modal window charity election delete */}
    </div>
  );
}

export default CharityElection;
