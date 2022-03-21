//DO import needed modules
import { getAllCollabsService } from "../../services/collab.services";
import { Avatar, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEraser, faEye, faPencil} from "@fortawesome/free-solid-svg-icons"

function CollabList() {
  //DO create a state to control info
  const [ allCollabs, setAllCollabs ] = useState(null);

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
      const response = await getAllCollabsService()
      setAllCollabs(response.data);
    } catch (err) {
      navigate("/error");
    }
  };

  const handleAddCauseClick = (id) => {
    navigate(`/collabs/add`)
  }

  const handleViewDetailsClick = (id) => {
    navigate(`/collabs/details/${id}`)
  }

  const handleEditClick = (id) => {
    navigate(`/collabs/edit/${id}`)
  }  

  const handleDeleteCollabClick = (id) => {
    navigate(`/collabs/delete/${id}`)
  };

  //DO use loading system to prevent errors
  if(!allCollabs) {
    return (
      <h3>...Loading</h3>
    )
  }

  return (
    <div>
      <h1>Collab List</h1>
      <Button onClick={handleAddCauseClick}>Add new collaborator</Button>
      {allCollabs.map((eachCollab, index) => {
        return (
          <div key={index+eachCollab.name}>
          <Avatar src={eachCollab.logo} alt="logo" />&nbsp;
          {eachCollab.name}
          <Button onClick={() => handleViewDetailsClick(eachCollab._id)}><FontAwesomeIcon icon={faEye} color={"green"}/></Button>
          <Button onClick={() => handleEditClick(eachCollab._id)} ><FontAwesomeIcon icon={faPencil} color={"blue"} /></Button>
          <Button onClick={() => handleDeleteCollabClick(eachCollab._id)}><FontAwesomeIcon icon={faEraser} color={"red"} /></Button>
          </div>
        )
      })}
    </div>
  )
}

export default CollabList