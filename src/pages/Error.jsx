//DO import needed modules
import { useState } from "react";

function Error() {

  const [errorMessage, setErrorMessage] = useState("");
  
  return (
    <div>
      <h1>Error</h1>
      <p>{errorMessage}</p>
    </div>
  );
}

export default Error;
