import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { addNewUser } from "../../store/userSlice";
import { useDispatch } from "react-redux";


function SignUp() {
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const newUser = () => {
        if (!password || username) {
            return alert("All fields are required");
        };

        dispatch(addNewUser({ username, password }));
    }

    return (
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
            <form onSubmit={newUser}>
                <h4> אנא צור משתמש </h4>
                <TextField variant="outlined" label="Full Name" value={username} onChange={(e) => setUserName(e.target.value)} required={true} />
                <TextField variant="outlined" label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required={true} />
                <Button variant="contained" type="submit">צור משתמש</Button>
            </form>
        </div>
    )

}

export default SignUp;