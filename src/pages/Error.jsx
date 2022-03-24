//DO import needed modules
import { useState } from "react";
import { Alert, Stack } from "@mui/material";

function Error() {

  const [errorMessage, setErrorMessage] = useState("");
  
  return (
    <div>
      <h1>Error</h1>
      {errorMessage && (<Stack sx={{ width: "100%", marginBottom: "1rem" }} spacing={2}><Alert severity="error">{errorMessage}</Alert></Stack>)}
    </div>
  );
}

export default Error;
