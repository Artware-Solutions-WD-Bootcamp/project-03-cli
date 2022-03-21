//DO import needed modules
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteUserService, getUserDetailsService } from "../../services/user.services.js";
import Card from "@mui/material/Card";
import {
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

function UserDelete() {
  //DO create state
  const [userDetails, setUserDetails] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  //DO get user details
  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    try {
      const response = await getUserDetailsService(id);
      // console.log(response);
      setUserDetails(response.data);
    } catch (err) {}
  };

  if (!userDetails) {
    return <h3>...Loading</h3>;
  }

  const handleDeleteUserClick = async (id) => {
    await deleteUserService(id)
    navigate(`/users`);
  };

  const { _id, username, email, level, avatar } = userDetails;

  return (
    <div>
      <h1>User Details</h1>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          image={avatar}
          alt="green iguana"
        />
        <CardContent sx={{ backgroundColor: "red" }}>
          <Typography gutterBottom variant="h5" component="div">
            Username: {username}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Level: {level}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            E-mail: {email}
          </Typography>
          <CardActions>
            <Button
              onClick={() => handleDeleteUserClick(_id)}
              size="small"
              variant="contained"
              sx={{ backgroundColor: "black", color: "red" }}
            >
              Delete
            </Button>
            <Button
              onClick={() => navigate(-1)}
              size="small"
              variant="contained"
              sx={{ backgroundColor: "gray", color: "white" }}
            >
              Cancel
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </div>
  );
}

export default UserDelete;
