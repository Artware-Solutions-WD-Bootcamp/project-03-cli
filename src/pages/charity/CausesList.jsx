//DO import needed services
import { getAllCausesService, addNewCauseService, getCauseDetailsService, updateCauseService, deleteCauseService } from "../../services/cause.services";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser, faEye, faPencil } from "@fortawesome/free-solid-svg-icons";

import {
  Avatar,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  TextField,
  // Stack,
} from "@mui/material";

function CausesList() {

  // Begin add cause modal window routine
  const [openAddCause, setAddCauseOpen] = useState(false);
  const handleClickAddCauseOpen = () => { setAddCauseOpen(true) };
  const handleClickAddCauseClose = () => { setAddCauseOpen(false) };

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [logo, setLogo] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleName = (e) => { setName(e.target.value) };
  const handleDescription = (e) => { setDescription(e.target.value) };
  const handleUrl = (e) => { setUrl(e.target.value) };
  const handleLogo = (e) => { setLogo(e.target.value) };

  const handleAddCauseSubmit = async () => {
    try {
      const newCause = { name, description, url, logo };
      await addNewCauseService(newCause);
      getAllCauses();
      setAddCauseOpen(false);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setErrorMessage(err.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };
  // End add cause modal window routine

  // Begin update cause modal window routine
  const [openUpdateCause, setUpdateCauseOpen] = useState(false);
  const handleClickUpdateCauseOpen = (id) => {
     setUpdateCauseOpen(true)
     
     };
  const handleClickUpdateCauseClose = () => { setUpdateCauseOpen(false) };

  const handleClickUpdateSubmit = async () => {

    // update cause routine

  }

  // End update cause modal window routine

  //DO create a state to control info
  const [allCauses, setAllCauses] = useState(null);

  //DO navigator hook
  const navigate = useNavigate();

  //DO useEffect to look for info
  useEffect(() => { getAllCauses() }, []);

  //DO async function to obtain data from DB
  const getAllCauses = async () => {
    try {
      //? obtain info from DB
      const response = await getAllCausesService();
      setAllCauses(response.data);
    } catch (err) {
      navigate("/error");
    }
  };

  const handleAddCauseClick = () => { navigate(`/causes/add`) };
  const handleViewDetailsClick = (id) => { navigate(`/causes/details/${id}`) };
  const handleEditClick = (id) => { navigate(`/causes/edit/${id}`) };
  const handleDeleteCauseClick = (id) => { navigate(`/causes/delete/${id}`) };

  //DO use loading system to prevent errors
  if (!allCauses) {
    return <h3>...Loading</h3>;
  }

  return (
    <div>
      <h1>Causes</h1>
      <Button onClick={handleAddCauseClick}>Add new charitable cause</Button>
      <Button variant="outlined" onClick={handleClickAddCauseOpen}> Add new charitable cause (Modal) </Button>
      <Button variant="outlined" onClick={handleClickUpdateCauseOpen}> Update charitable cause (Modal) </Button>

      {/* Begin all causes list */}
      {allCauses.map((eachCause, index) => {
        return (
          <div key={index + eachCause.name}>
            <Avatar src={eachCause.logo} alt="logo" />
            &nbsp;
            {eachCause.name}
            <Button onClick={() => handleViewDetailsClick(eachCause._id)}>
              <FontAwesomeIcon icon={faEye} color={"green"} />
            </Button>
            <Button onClick={() => handleClickUpdateCauseOpen(eachCause._id)}>
              <FontAwesomeIcon icon={faPencil} color={"blue"} />
            </Button>
            <Button onClick={() => handleDeleteCauseClick(eachCause._id)}>
              <FontAwesomeIcon icon={faEraser} color={"red"} />
            </Button>
          </div>
        );
      })}
      {/* End all causes list */}

      {/* Begin add cause modal window */}
      <div>
        <Dialog open={openAddCause} onClose={handleClickAddCauseClose}>
          <DialogTitle>Add new charitable cause</DialogTitle>
          <DialogContent>
            <FormControl>
              <TextField label="Cause name*: " name="name" id="name" value={name} aria-describedby="name-helper-text" onChange={handleName} />
              <FormHelperText id="name-helper-text"> The charity cause name (required) </FormHelperText>

              <TextField label="Description*: " name="description" id="description" value={description} aria-describedby="description-helper-text" onChange={handleDescription} />
              <FormHelperText id="description-helper-text"> Description of the cause (required) </FormHelperText>

              <TextField label="URL: " name="url" id="url" value={url} aria-describedby="url-helper-text" onChange={handleUrl} />
              <FormHelperText id="url-helper-text"> The URL of the entity which will receive the donation of the cause </FormHelperText>

              <TextField label="Logo: " name="logo" id="logo" value={logo} aria-describedby="logo-helper-text" onChange={handleLogo} />
              <FormHelperText id="logo-helper-text"> Cause cover image </FormHelperText>

              <DialogActions>
                <Button type="submit" variant="outlined" onClick={handleAddCauseSubmit}> Add </Button>
                <Button type="submit" variant="outlined" onClick={handleClickAddCauseClose}> Cancel </Button>
              </DialogActions>
            </FormControl>
          </DialogContent>
        </Dialog>
      </div>
      {/* End add cause modal window */}

      {/* Begin update cause modal window */}
      <div>
        <Dialog open={openUpdateCause} onClose={handleClickUpdateCauseClose}>
          <DialogTitle>Update charitable cause</DialogTitle>
          <DialogContent>
            <FormControl>
              <TextField label="Cause name*: " name="name" id="name" value={name} aria-describedby="name-helper-text" onChange={handleName} />
              <FormHelperText id="name-helper-text"> The charity cause name (required) </FormHelperText>

              <TextField label="Description*: " name="description" id="description" value={description} aria-describedby="description-helper-text" onChange={handleDescription} />
              <FormHelperText id="description-helper-text"> Description of the cause (required) </FormHelperText>

              <TextField label="URL: " name="url" id="url" value={url} aria-describedby="url-helper-text" onChange={handleUrl} />
              <FormHelperText id="url-helper-text"> The URL of the entity which will receive the donation of the cause </FormHelperText>

              <TextField label="Logo: " name="logo" id="logo" value={logo} aria-describedby="logo-helper-text" onChange={handleLogo} />
              <FormHelperText id="logo-helper-text"> Cause cover image </FormHelperText>

              <DialogActions>
                <Button type="submit" variant="outlined" onClick={handleClickUpdateSubmit}> Add </Button>
                <Button type="submit" variant="outlined" onClick={handleClickUpdateCauseClose}> Cancel </Button>
              </DialogActions>
            </FormControl>
          </DialogContent>
        </Dialog>
      </div>
      {/* End update cause modal window */}

    </div>
  );
}

export default CausesList;
