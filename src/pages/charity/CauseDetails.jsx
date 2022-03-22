//DO import needed modules
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCauseDetailsService } from "../../services/cause.services.js";
import Card from "@mui/material/Card";
import {
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Checkbox, 
  Typography,
} from "@mui/material";

function CauseDetails() {

  //DO create state
  const [causeDetails, setCauseDetails] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  //DO get charity cause details
  useEffect(() => {
    getCauseDetails();
  }, []);

  const getCauseDetails = async () => {
    try {
      const response = await getCauseDetailsService(id);
      // console.log(response);
      setCauseDetails(response.data);
    } catch (err) {}
  };

  //DO use loading...
  if (!causeDetails) {
    return <h3>...Loading</h3>;
  }

  const handleEditCauseClick = (id) => {
    navigate(`/causes/edit/${id}`)
  }  

  const handleDeleteCauseClick = (id) => {
    navigate(`/causes/delete/${id}`)
  };

  const { name, description, url, logo, active, visible, assignedAmount, deliveryProof } = causeDetails;

  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          image={logo}
          alt="charity cause image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Description: {description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            URL: {url}
          </Typography>
          
          <Typography variant="body2" color="text.secondary">
            Active: <Checkbox checked={active} />
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Visible: <Checkbox checked={visible} />
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Assigned amount: {assignedAmount}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Delivery proof: {deliveryProof}
          </Typography>
          <CardActions>
            {/* {isAdmin && ( <Button onClick={() => handleEditCauseClick(id)} size="small">Edit</Button> )} */}
            {/* {isAdmin && ( <Button onClick={() => handleDeleteCauseClick(id)} size="small">Delete</Button> )} */}
            <Button onClick={() => handleEditCauseClick(id)} size="small">Edit</Button>
            <Button onClick={() => handleDeleteCauseClick(id)} size="small">Delete</Button>
            <Button onClick={() => navigate(-1)} size="small">Turn back</Button>
          </CardActions>
        </CardContent>
      </Card>
    </div>
  );
}

export default CauseDetails;
