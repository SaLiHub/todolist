import React, { useState } from 'react';
import './App.sass';

import { Navigate, Route, Routes } from "react-router-dom";
import SignIn from "../Sign/SignIn";
import SignUp from "../Sign/SignUp";
import Profile from "../Profile/Profile";
import { createTheme, CssBaseline, StyledEngineProvider, ThemeProvider } from "@mui/material";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function App() {

    const [, setReload] = useState(false);
    const isAuth = localStorage.getItem('isAuth');

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline/>
                <div className="App">
                    {isAuth === 'true' ?
                        <Routes>
                            <Route path="/profile" element={<Profile setReload={setReload}/>}/>
                            <Route
                                path="*"
                                element={<Navigate to="/profile" replace/>}
                            />
                        </Routes> :
                        <Routes>
                            <Route path="/sign-in" element={<SignIn setReload={setReload}/>}/>
                            <Route path="/sign-up" element={<SignUp/>}/>
                            <Route
                                path="*"
                                element={<Navigate to="/sign-in" replace/>}
                            />
                        </Routes>
                    }
                </div>

            </ThemeProvider>
        </StyledEngineProvider>
    );

}

export default App;