import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Button, Stack} from "@mui/material";
import Todolist from "./Todolist/Todolist";


export default function Profile () {

    const [userInfo, setUserInfo] = useState<string | undefined>();
    const navigate = useNavigate();

    function logout () {
        navigate('../sign-in', {replace: true})
    };

    useEffect(() => {
        axios.get(`http://localhost:3001/api/v1/profile`, {withCredentials: true}).then((res) => {
            console.log(res.data)
            if(res.data.done) {
                setUserInfo(res.data.username)
            } else {
                logout()
            }
        })
    }, [])

    return (
        <div className="Profile">
            <Stack spacing={2} direction="row" justifyContent="space-between">
                <p>{userInfo}</p>
                <div>
                    <Button variant="contained" onClick={logout}>Log out</Button>
                </div>
                <Todolist />
            </Stack>
        </div>
    )
}