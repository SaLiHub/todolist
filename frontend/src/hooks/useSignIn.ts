import axios from "axios";
import { useRef, useState } from "react";
import { Error } from './useSignUp';
import { isValidEmail } from "../helpers/helper.todolist";
import { SERVER_URL } from "../constants";
import { SignInProps } from "../types/interfaces";

export const useSignIn = ({reload, setReload}: SignInProps) => {

    const [error, setError] = useState<Error | null>();
    const checkboxRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const emailRef = useRef() as React.MutableRefObject<HTMLInputElement>;

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!isValidEmail(emailRef.current.value)) {
            setError({name: 'error', message: 'Email is not valid'});
            return;
        }

        const data = new FormData(event.currentTarget);
        const dataToSend = {
            email: data.get('email'),
            password: data.get('password'),
            isChecked: checkboxRef.current?.value
        };

        axios.post(`${SERVER_URL}/api/v1/sign-in`, dataToSend, {withCredentials: true})
            .then((res) => {
                const {message, done} = res.data;
                if (done) {
                    localStorage.setItem('isAuth', 'true');
                    setReload(!reload);
                } else {
                    setError({name: 'error', message});
                }
            }).catch(e => console.log(e));
    };

    return {
        handleSubmit,
        emailRef,
        checkboxRef,
        error
    }
}
