import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button, Stack} from "@mui/material";
import Todolist from "./Todolist/Todolist";

export default function Profile() {

    const [userInfo, setUserInfo] = useState<string | undefined>();

    function logout() {
        localStorage.isAuth = false;
        window.location.href = '/sign-in';
    };

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
            <Stack spacing={2} direction="row" justifyContent="space-between">
                <h1>Hello {userInfo}!!!</h1>
                <Todolist/>
                <div>
                    <Button variant="contained" onClick={logout}>Log out</Button>
                </div>
            </Stack>
        </div>
    )
}