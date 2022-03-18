import AddUserForm from "../../components/AddUserForm";
import { getAllUsersService } from "../../services/user.services";

import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

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
      console.log(response);
      setAllUsers(response.data);
    } catch (err) {
      navigate("/error");
    }
  };

  //DO use loading system to prevent errors
  if(!allUsers) {
    return (
      <h3>...Loading</h3>
    )
  }

  return (
    <div>
      <AddUserForm getAllTodos={getAllUsers}/>

      <h1>Users List</h1>
      {allUsers.map((eachUser, index) => {
        return (
          <div key={index+eachUser.username}>
          <Link to={`/users/details/${eachUser._id}`}>{eachUser.username}</Link>
          </div>
        )
      })}
    </div>
  );
}

export default UsersList;
