//DO import needed modules
import { getAllUsersService } from "../../services/user.services";
import { Avatar, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEraser, faEye, faPencil} from "@fortawesome/free-solid-svg-icons"

function UsersList() {
  //DO create a state to control info
  const [ allUsers, setAllUsers ] = useState(null);

  //DO navigator hook
  const navigate = useNavigate();

  //DO useEffect to look for info
  useEffect(() => {
    getAllUsers();
  }, []);

  //DO async function to obtain data from DB
  const getAllUsers = async () => {
    try {
      //? obtain info from DB
      const response = await getAllUsersService()
      setAllUsers(response.data);
    } catch (err) {
      navigate("/error");
    }
  };

  const handleAddUserClick = (id) => {
    navigate(`/users/add`)
  }

  const handleViewDetailsClick = (id) => {
    navigate(`/users/details/${id}`)
  }

  const handleEditClick = (id) => {
    navigate(`/users/edit/${id}`)
  }  

  const handleDeleteUserClick = (id) => {
    navigate(`/users/delete/${id}`)
  };

  //DO use loading system to prevent errors
  if(!allUsers) {
    return (
      <h3>...Loading</h3>
    )
  }

  return (
    <div>
      <h1>Users List</h1>
      <Button onClick={handleAddUserClick}>Add new user</Button>

      {allUsers.map((eachUser, index) => {
        return (
          <div key={index+eachUser.username}>
          <Avatar src={eachUser.avatar} alt="avatar"  />&nbsp;
          {eachUser.username}
          <Button onClick={() => handleViewDetailsClick(eachUser._id)}><FontAwesomeIcon icon={faEye} color={"green"}/></Button>
          <Button onClick={() => handleEditClick(eachUser._id)} ><FontAwesomeIcon icon={faPencil} color={"blue"} /></Button>
          <Button onClick={() => handleDeleteUserClick(eachUser._id)}><FontAwesomeIcon icon={faEraser} color={"red"} /></Button>
          </div>
        )
      })}
    </div>
  );
}

export default UsersList;
