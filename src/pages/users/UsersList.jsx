//DO import needed modules
import { getAllUsersService } from "../../services/user.services";
import { Avatar, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
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
    <div className="data-list">
      <h1>All users List</h1>
      <Button onClick={handleAddUserClick} variant="outlined" style={{ marginBottom: "30px" }}>Add new user</Button>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Avatar</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="center">V</TableCell>
            <TableCell align="center">E</TableCell>
            <TableCell align="center">D</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
      {allUsers.map((eachUser, index) => {
        return (
            <TableRow key={index+eachUser.username} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
              <TableCell align="center" component="th" scope="row"><Avatar src={eachUser.avatar} alt="avatar"/></TableCell>
              <TableCell>{eachUser.username}</TableCell>
              <TableCell align="center"><Button onClick={() => handleViewDetailsClick(eachUser._id)}><FontAwesomeIcon icon={faEye} color={"green"} style={{maxWidth: '1rem', maxHeight: '1rem', minWidth: '1rem', minHeight: '1rem1rem'}} /></Button></TableCell>
              <TableCell align="center"><Button onClick={() => handleEditClick(eachUser._id)} ><FontAwesomeIcon icon={faPencil} color={"blue"} style={{maxWidth: '1rem', maxHeight: '1rem', minWidth: '1rem', minHeight: '1rem'}} /></Button></TableCell>
              <TableCell align="center"><Button onClick={() => handleDeleteUserClick(eachUser._id)}><FontAwesomeIcon icon={faEraser} color={"red"} style={{maxWidth: '1rem', maxHeight: '1rem', minWidth: '1rem', minHeight: '1rem'}} /></Button></TableCell>
            </TableRow>
        )
      })}
        </TableBody>
      </Table>
      </TableContainer>
    </div>
  );
}

export default UsersList;
