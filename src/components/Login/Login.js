import { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import {  useNavigate } from "react-router-dom";
import './login.css'
import { useDispatch, useSelector } from "react-redux"
import { login } from "../../store/userSlice";


function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const user = useSelector(state => state.user);

    useEffect(() => {
        if(user.loggedIn){
            navigate("/");
        }
    }, [user])

    const onLogin = (e) => {
        e.preventDefault()
        dispatch(login({ username, password }));
    }

    return (
        <form className="loginStyle" onSubmit={onLogin}>
            <h4>Login Page</h4>
            <TextField type="text" value={username} onChange={(e) => setUsername(e.target.value)}>Username</TextField>
            <TextField type="password" value={password} onChange={(e) => setPassword(e.target.value)}>Password</TextField>
            <Button type="submit" variant="contained">Login</Button>
        </form>

    )
}

export default Login;