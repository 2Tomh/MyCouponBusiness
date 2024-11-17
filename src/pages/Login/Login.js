import { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import {  useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { login } from "../../store/userSlice";
import styles from './Login.module.css'

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
        <form className={styles.loginStyle} onSubmit={onLogin}>
            <h4 className={styles.headline}>ברוך הבא לאתר הקופונים</h4>
            <h4 className={styles.title}>אנא התחבר למערכת</h4>
            <TextField label="User Name" variant="outlined" type="text" value={username} onChange={(e) => setUsername(e.target.value)}>Username</TextField>
            <TextField label="Password" variant="outlined" type="password" value={password} onChange={(e) => setPassword(e.target.value)}>Password</TextField>
            <Button type="submit" variant="contained">התחבר</Button>
        </form>

    )
}

export default Login;