import { Alert, Button, Snackbar, TextField } from "@mui/material";
import { useState } from "react";
import { addNewUser } from "../../store/userSlice";
import { useDispatch } from "react-redux";
import styles from './SignUp.module.css'

function SignUp() {
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("");
    const [snackbar, setSnackbar] = useState({ visible: false, message: "", type: "" });

    const dispatch = useDispatch();

    const newUser = (e) => {
        e.preventDefault()

        if (!password || !username) {
        
            return setSnackbar({ visible: true, message: "All fields are required", type: "error" });
        };
        
        dispatch(addNewUser({ username, password }));
        setSnackbar({ visible: true, message: "Created user successfully", type: "success" })
    }

    return (
        <>
            <Snackbar autoHideDuration={3000}
                open={snackbar.visible}
                anchorOrigin={{ vertical: 'top', horizontal: "center" }}
                onClose={() => setSnackbar({ visible: false, message: "", type: "" })
                }>
                <Alert variant="filled" color={snackbar.type}>{snackbar.message}</Alert>
            </Snackbar>
            <div className="SignUp" style={{
                textAlign: "center",
                fontSize: "45px",
                height: "100%",
                paddingTop: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textDecoration: "none",
                gap: "15px"


            }} >
                <form className={styles.signUpStyle} onSubmit={newUser} >
                    <h4 className={styles.headline}>  אנא צור משתמש חדש </h4>
                    <h1 className={styles.titleUserName}>: הכנס שם מתשתמש </h1>
                    <TextField variant="outlined" label="Full Name" value={username} onChange={(e) => setUserName(e.target.value)} />
                    <h1 className={styles.titlePassword}> : הכנס סיסמא </h1>
                    <TextField variant="outlined" label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Button variant="contained" type="submit">צור משתמש</Button>
                </form>
            </div>
        </>
    )

}

export default SignUp;