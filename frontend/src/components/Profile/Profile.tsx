import './Profile.sass'

import React, { useEffect, useState } from "react";
import axios from "axios";
import Todolist from "../Todolist/Todolist";
import LogoutIcon from '@mui/icons-material/Logout';
import { Container, IconButton } from "@mui/material";

export default function Profile() {

    const [userInfo, setUserInfo] = useState<string | undefined>();

    function logout() {
        localStorage.isAuth = false;
        window.location.href = '/sign-in';
    }

    useEffect(() => {
        axios.get(`http://localhost:3001/api/v1/profile`, {withCredentials: true}).then((res) => {
            if (res.data.done) {
                setUserInfo(res.data.username)
            } else {
                logout()
            }
        })
    }, [])

    return (
        <div className="Profile">
            <div className="Profile__header">
                <h4>{userInfo}'s profile</h4>
                <div className="Profile__logout">
                    <IconButton aria-label="delete"
                                color="primary"
                                className="Profile__logout-button"
                                onClick={logout}>
                        <LogoutIcon/>
                    </IconButton>
                </div>
            </div>

            <Container className="Profile__body">
                <Todolist/>
            </Container>
        </div>
    )
}