import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addNewUserService } from "../services/user.services";

function AddUserForm(props) {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [level, setLevel] = useState("")
  const [avatar, setAvatar] = useState("")

  const handleUsername = (e) => {setUsername(e.target.value)}
  const handleEmail = (e) => {setEmail(e.target.value)}
  const handlePassword = (e) => {setPassword(e.target.value)}
  const handleLevel = (e) => {setLevel(e.target.value)}
  const handleAvatar = (e) => {setAvatar(e.target.value)}

  const navigate = useNavigate()

  const handleSumbit = async (e) => {
    e.preventDefault()

    try {
    const newUser = {username, email, password, level, avatar}
    const response = await addNewUserService(newUser)
    props.getAllUsers()
    setUsername("")
    setEmail("")
    setPassword("")
    setLevel("")
    setAvatar("")
    } catch(err) {
      navigate("/error")
    }
  }

  return (
    <div>
      <h3>Add New User</h3>

      <form onSubmit={handleSumbit}>
        <label htmlFor="username">Username: </label>
        <input type="text" name="username" value={username} onChange={handleUsername} />

        <label htmlFor="email">E-mail: </label>
        <input type="text" name="email" value={email} onChange={handleEmail} />

        <label htmlFor="password">Password: </label>
        <input type="text" name="password" value={password} onChange={handlePassword} />

        <label htmlFor="level">Level: </label>
        <select name="level" onChange={handleLevel}>
          <option value="">Select level</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <label htmlFor="avatar">Avatar: </label>
        <input type="text" name="avatar" value={avatar} onChange={handleAvatar} />

        <button>Add</button>
      </form>
    </div>
  );
}

export default AddUserForm