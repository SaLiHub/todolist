import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useRef, useState} from "react";
import { Error } from './useSignUp';

export const useSignIn = () => {

    const navigate = useNavigate();
    const [error, setError] = useState<Error | null>();
    const checkboxRef = useRef() as React.MutableRefObject<HTMLInputElement>;


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(data)
        const dataToSend = {
            email: data.get('email'),
            password: data.get('password'),
            isChecked: checkboxRef.current?.value
        };

        axios.post(`http://localhost:3001/api/v1/sign-in`, dataToSend, {withCredentials: true})
            .then((res) => {
                const {message, done} = res.data;
                if(done) {
                    navigate("/profile", { replace: true });
                } else {
                    setError({name: 'error', message});
                }
            }).catch(e => console.log(e))
    };

    return {
        handleSubmit,
        error,
        checkboxRef
    }
}
