import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { isValidEmail } from "../helpers/helper.todolist";
import { SERVER_URL } from "../constants";

export interface Error {
    name: string;
    message: string;
}

export const useSignUp = () => {

    const [error, setError] = useState<Error | null>();
    const [openDialog, setOpenDialog] = useState(false);

    const emailRef = useRef() as React.MutableRefObject<HTMLInputElement>;

    const handleDialog = () => {
        setOpenDialog(false);
        navigate("/sign-in", {replace: true});
    };

    const navigate = useNavigate();

    const handleInput = () => {
        // Clear error if user start typing in inputs
        setError(null);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!isValidEmail(emailRef.current.value)) {
            setError({name: 'error', message: 'Email is not valid'});
            return;
        }
        ;

        const data = new FormData(event.currentTarget);
        const dataToSend = {
            email: data.get('email'),
            password: data.get('password'),
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            username: data.get('username'),
        }


        axios.post(`${SERVER_URL}/api/v1/sign-up`, dataToSend)
            .then((res) => {
                const {message, done} = res.data;
                if (done) {
                    setOpenDialog(true);
                } else {
                    setError({name: 'error', message});
                }
            }).catch(e => console.log(e))

    };

    return {
        handleSubmit,
        handleInput,
        error,
        openDialog,
        handleDialog,
        emailRef
    }
}
