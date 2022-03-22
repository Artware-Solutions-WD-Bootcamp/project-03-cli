//DO import needed modules
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addNewCauseService } from "../../services/cause.services";
import { Button, FormControl, FormHelperText, TextField, Stack } from "@mui/material";

function CauseAdd() {

  const [ name, setName ] = useState("")
  const [ description, setDescription ] = useState("")
  const [ url, setUrl ] = useState("")
  const [ logo, setLogo ] = useState("")
  const [ errorMessage, setErrorMessage ] = useState("")

  const handleName = (e) => { setName(e.target.value) };
  const handleDescription = (e) => { setDescription(e.target.value) };
  const handleUrl = (e) => { setUrl(e.target.value) };
  const handleLogo = (e) => { setLogo(e.target.value) };

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const newCause = { name, description, url, logo };
      await addNewCauseService(newCause);
      navigate("/causes");
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setErrorMessage(err.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  return (
    <div>
      <h3>Add New Cause</h3>
      <p>{errorMessage}</p>
      <FormControl>
        <TextField label="Cause name*: " name="name" id="name" value={name} aria-describedby="name-helper-text" onChange={handleName} />
        <FormHelperText id="name-helper-text">The charity cause name (required)</FormHelperText>

        <TextField label="Description*: " name="description" id="description" value={description} aria-describedby="description-helper-text" onChange={handleDescription} />
        <FormHelperText id="description-helper-text">Description of the cause (required)</FormHelperText>

        <TextField label="URL: " name="url" id="url" value={url} aria-describedby="url-helper-text" onChange={handleUrl} />
        <FormHelperText id="url-helper-text">The URL of the entity which will receive the donation of the cause</FormHelperText>

        <TextField label="Logo: " name="logo" id="logo" value={logo} aria-describedby="logo-helper-text" onChange={handleLogo} />
        <FormHelperText id="logo-helper-text">Cause cover image</FormHelperText>

        <Stack direction="row" spacing={2}>
          <Button type="submit" variant="outlined" onClick={handleSubmit}>
            Add
          </Button>
          <Button type="submit" variant="outlined" onClick={() => navigate(-1)}>
            Cancel
          </Button>
        </Stack>
      </FormControl>
    </div>
  )
}

export default CauseAdd