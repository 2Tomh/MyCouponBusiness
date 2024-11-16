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
        isAdmin: false,
        username: ""
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
                let isAdmin = false

                localStorage.setItem("loggedIn", true); // Would save JWT token instead if had server

                if (state.users[userIndex].role.includes(ADMIN)) {
                    localStorage.setItem("isAdmin", true);
                    isAdmin = true;
                }

                return { ...state, loggedIn: true, isAdmin, username: action.payload.username }
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