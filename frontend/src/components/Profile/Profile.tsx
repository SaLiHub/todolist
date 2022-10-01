import './Profile.sass'

import React, { useEffect, useState } from "react";
import axios from "axios";
import Todolist from "../Todolist/Todolist";
import LogoutIcon from '@mui/icons-material/Logout';
import { Container, IconButton } from "@mui/material";
import { SERVER_URL } from "../../constants";
import { SignInProps } from "../../types/interfaces";

export default function Profile(props: { reload: SignInProps }) {

    const {reload, setReload} = props.reload;
    const [userInfo, setUserInfo] = useState<string | undefined>();

    function logout() {
        localStorage.isAuth = false;
        setReload(!reload);
    }

    useEffect(() => {
        axios.get(`${SERVER_URL}/api/v1/profile`, {withCredentials: true}).then((res) => {
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