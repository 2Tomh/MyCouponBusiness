import { createSlice } from "@reduxjs/toolkit";


const ADMIN = 'ADMIN';

const userSlice = createSlice({
    name: "user",
    initialState: {
        users: [
            {
                username: "Admin",
                password: "Admin",
                role: [ADMIN]
            },
        ],
        loggedIn: false,
        isAdmin: false
    },
    reducers: {
        addNewUser: (state, action) => {
            const users = [...state.users];
            users.push(action.payload);
            return { ...state, users }
        },
        login: (state, action) => {
            let userIndex = state.users.findIndex((user) => user.username == action.payload.username)

            if (userIndex < 0) {
                return { ...state, loggedIn: false }
            }

            if (state.users[userIndex].password == action.payload.password) {

                localStorage.setItem("loggedIn", true); // Would save with JWT token instead with server
                if (state.users[userIndex].isAdmin) {
                    localStorage.setItem("isAdmin", true);
                }

                return { ...state, loggedIn: true, isAdmin: true }
            }

            return { ...state, loggedIn: false }

        },
        signout: (state, action) => {
            localStorage.removeItem("loggedIn");

            return { ...state, loggedIn: false, isAdmin: false };
        }
    }
})

export const { addNewUser, login, signout } = userSlice.actions;

export default userSlice.reducer