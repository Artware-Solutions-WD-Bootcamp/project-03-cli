//DO import needed modules
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerService } from "../../services/auth.services.js";

function Register() {

  //DO set needed states
  const [username, setUsername] = useState("");
  const [email, setUserEmail] = useState("");
  const [password, setUserPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  //DO set needed hooks
  const navigate = useNavigate();

  //DO handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    //! build user object to be sent
    const user = { username, email, password };

    try {
      //! send user to backend to create it
      await registerService(user);

      //! redirect user to desired page
      navigate("/login");

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
      <h3>Registrarse</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">UserName: </label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <br />
        <label htmlFor="email">Email: </label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setUserEmail(e.target.value)}
        />

        <br />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setUserPassword(e.target.value)}
        />

        <button>Sign Up</button>
      </form>
      <p>{errorMessage}</p>
    </div>
  );
}

export default Register;
