import React from 'react';

import './App.css';

import { Navigate, Route, Routes } from "react-router-dom";
import SignIn from "../../auth/SignIn";
import SignUp from "../../auth/SignUp";
import Profile from "../Profile";

function App() {

    const isAuth = localStorage.getItem('isAuth');

    return (
        <div className="App">
            {isAuth === 'true' ?
                <Routes>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route
                        path="*"
                        element={<Navigate to="/profile" replace/>}
                    />
                </Routes> :
                <Routes>
                    <Route path="/sign-in" element={<SignIn/>}/>
                    <Route path="/sign-up" element={<SignUp/>}/>
                    <Route
                        path="*"
                        element={<Navigate to="/sign-in" replace/>}
                    />
                </Routes>
            }
        </div>
    );
}

export default App;