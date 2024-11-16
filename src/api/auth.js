import axios from 'axios';

const loginUser = async (username, password) => {
    const response = await axios.get("/login");
}

const signupUser = async (username, password) => {
    const response = await axios.get("/login");
}


export { loginUser, signupUser };