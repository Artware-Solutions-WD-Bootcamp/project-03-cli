//DO import needed services
import { getAllCausesService, addNewCauseService, getCauseDetailsService, updateCauseService, deleteCauseService } from "../../services/cause.services";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser, faEye, faPencil } from "@fortawesome/free-solid-svg-icons";

import { Avatar, Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, TextField } from "@mui/material";

function CausesList() {
  //DO create a state to control info
  const [allCauses, setAllCauses] = useState(null); // allCauses array

  const [name, setName] = useState(""); // for CausesList
  const [description, setDescription] = useState(""); // for CausesList
  const [url, setUrl] = useState(""); // for CausesList
  const [logo, setLogo] = useState(""); // for CausesList
  const [active, setActive] = useState(""); // for CausesDetails and CausesUpdate
  const [visible, setVisible] = useState(""); // for CausesDetails and CausesUpdate
  const [assignedAmount, setAssignedAmount] = useState(""); // for CausesDetails and CausesUpdate
  const [deliveryProof, setDeliveryProof] = useState(""); // for CausesDetails and CausesUpdate
  const [errorMessage, setErrorMessage] = useState("");
  const [openAddCause, setAddCauseOpen] = useState(false); // addCause modal state
  const [openUpdateCause, setUpdateCauseOpen] = useState(false); // updateCause modal state
  
  
  
  // add cause modal window routine
  const handleClickAddCauseOpen = () => { setAddCauseOpen(true); setName(""); setDescription(""); setUrl(""); setLogo("");  };
  const handleClickAddCauseClose = () => { setAddCauseOpen(false) };

  // update cause modal window routine
  const handleClickUpdateCauseOpen = (id) => { setUpdateCauseOpen(true) };
  const handleClickUpdateCauseClose = () => { setUpdateCauseOpen(false) };
  const handleClickUpdateSubmit = async () => {  /* update cause routine */ };



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

  //DO navigator hook
  const navigate = useNavigate();

  //DO useEffect to look for info
  useEffect(() => {
    getAllCauses();
  }, []);

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

  const handleAddCauseClick = () => {
    navigate(`/causes/add`);
  };
  const handleViewDetailsClick = (id) => {
    navigate(`/causes/details/${id}`);
  };
  const handleEditClick = (id) => {
    navigate(`/causes/edit/${id}`);
  };
  const handleDeleteCauseClick = (id) => {
    navigate(`/causes/delete/${id}`);
  };

  //DO use loading system to prevent errors
  if (!allCauses) {
    return <h3>...Loading</h3>;
  }

  return (
    <div>
      <h1>Causes</h1>
      <Button onClick={handleAddCauseClick}>Add new charitable cause</Button>
      <Button variant="outlined" onClick={handleClickAddCauseOpen}>
        Add new charitable cause
      </Button>
      <Button variant="outlined" onClick={handleClickUpdateCauseOpen}>
        Update charitable cause
      </Button>

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
                <Button type="submit" variant="outlined" onClick={handleAddCauseSubmit}>
                  Add
                </Button>
                <Button type="submit" variant="outlined" onClick={handleClickAddCauseClose}>
                  Cancel
                </Button>
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

              <TextField label="Active: " name="active" id="active" value={active} aria-describedby="active-helper-text" onChange={handleLogo} />
              <FormHelperText id="active-helper-text"> Cause status (active/finished) </FormHelperText>

              <TextField label="Visible: " name="visible" id="visible" value={visible} aria-describedby="visible-helper-text" onChange={handleLogo} />
              <FormHelperText id="visible-helper-text"> Cause visibility (visible/hidden) </FormHelperText>

              <TextField label="Assigned amount: " name="assignedAmount" id="assignedAmount" value={assignedAmount} aria-describedby="assignedAmount-helper-text" onChange={handleLogo} />
              <FormHelperText id="assignedAmount-helper-text"> Cause assigned amount </FormHelperText>

              <TextField label="Delivery proof: " name="deliveryProof" id="deliveryProof" value={deliveryProof} aria-describedby="deliveryProof-helper-text" onChange={handleLogo} />
              <FormHelperText id="deliveryProof-helper-text"> Proof of donation delivery </FormHelperText>

              <DialogActions>
                <Button type="submit" variant="outlined" onClick={handleClickUpdateSubmit}>
                  {" "}
                  Add{" "}
                </Button>
                <Button type="submit" variant="outlined" onClick={handleClickUpdateCauseClose}>
                  {" "}
                  Cancel{" "}
                </Button>
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
