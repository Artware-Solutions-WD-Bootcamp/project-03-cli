//DO import needed modules
import { getAllCausesService } from "../../services/cause.services";
import { Avatar, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser, faEye, faPencil } from "@fortawesome/free-solid-svg-icons";

function CausesList() {
  //DO create a state to control info
  const [allCauses, setAllCauses] = useState(null);

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

  const handleAddCauseClick = (id) => {
    navigate(`/causes/add`)
  }

  const handleViewDetailsClick = (id) => {
    navigate(`/causes/details/${id}`);
  };

  const handleEditClick = (id) => {
    navigate(`/causes/edit/${id}`);
  };

  const handleDeleteCollabClick = (id) => {
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
      {allCauses.map((eachCause, index) => {
        return (
          <div key={index+eachCause.name}>
          <Avatar src={eachCause.logo} alt="logo"  />&nbsp;
          {eachCause.name}
          <Button onClick={() => handleViewDetailsClick(eachCause._id)}><FontAwesomeIcon icon={faEye} color={"green"}/></Button>
          <Button onClick={() => handleEditClick(eachCause._id)} ><FontAwesomeIcon icon={faPencil} color={"blue"} /></Button>
          <Button onClick={() => handleDeleteCollabClick(eachCause._id)}><FontAwesomeIcon icon={faEraser} color={"red"} /></Button>
          </div>
        )
      })}
    </div>
  )
}

export default CausesList;
