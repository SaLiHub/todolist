import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {ChangeHolder, FieldProps, DataList, PendingState} from "../types/interfaces";

const useTodolist = () => {
    const [dataList, setDataList] = useState<DataList[]>([]);
    const [openCheckboxBar, setOpenCheckboxBar] = useState(false);
    const [openDeleteBar, setOpenDeleteBar] = useState(false);

    const textInput = useRef<HTMLInputElement | null>(null);

    // Hold last change in case user wants to undo it
    const changeHolder = useRef<ChangeHolder | null>(null);

    const [textFieldProps, setTextFieldProps] = useState<FieldProps>({
        id: "outlined-basic",
    })

    async function getAllData() {
        const response = await axios.get('http://localhost:3001/api/v1/tasks');
        setDataList(response.data);
    }

    useEffect(() => {
        window.addEventListener('beforeunload', (event) => {
            // Make changes if there's any pending
            try {
                if(null === changeHolder.current) return;
                changeHolder.current.sendRequest();
            } catch (e) {
                console.log(e);
            }
        })

        // Make request for initial data
        getAllData().catch(e => console.log(e));
    }, [])

    function addTask() {
        if (null === textInput.current) {
            setTextFieldProps({
                helperText: "Empty input.",
                error: true,
                id: "outlined-error-helper-text",
            })
            return;
        }

        setTextFieldProps({
            id: "outlined-basic",
        })

        if(null !== textInput.current) {
            const newTask = {
                isChecked: false,
                inputValue: textInput.current.value,
            };

            // Send dada to the server
            const {isChecked, inputValue} = newTask;

            axios.post('http://localhost:3001/api/v1/tasks/add', {isChecked, inputValue})
                .then((res) => {
                    setDataList([...dataList, res.data]); // Add new data to the dataList
                    console.log('New task was added!')
                }).catch(e => console.log(e))

            textInput.current.value = ''; // Reset input value
            textInput.current.focus();
        }

    }

    async function sendRequest({id, action} : PendingState, closeSnack = true) {
        if (action === 'delete') {
            await axios.delete('http://localhost:3001/api/v1/tasks/' + id)
        } else {
            await axios.patch('http://localhost:3001/api/v1/tasks/' + id)
        }

        if (closeSnack) {
            changeHolder.current = null;
            setOpenDeleteBar(false);
            setOpenCheckboxBar(false);
        }

    }

    function handlePendingState({id, action} : PendingState) {
        // If an action was made during timeout
        if (changeHolder.current !== null) {
            clearTimeout(changeHolder.current.timeout);
            // Execute previous action
            changeHolder.current.sendRequest(false);
        }

        // Create a new timeout for the current action
        changeHolder.current = {
            timeout: setTimeout(() => sendRequest({id, action}), 6000),
            sendRequest: (closeSnack = true) => sendRequest({id, action}, closeSnack)
        }
    }

    function deleteTask(i: number, id: number) {
        dataList.splice(i, 1)
        setDataList([...dataList]);

        handlePendingState({action: 'delete', id});

        // Open new Snackbar
        setOpenDeleteBar(true);
    }

    function handleCheckBox(i: number, id: number) {
        dataList[i].isChecked = !dataList[i].isChecked;
        dataList[i].finishedAt = new Date().toString();
        setDataList([...dataList])

        handlePendingState({action: 'check', id});

        // Open new Snackbar
        setOpenCheckboxBar(true);
    }

    function closeSnackbar() {
        if(changeHolder.current === null) return;
        clearTimeout(changeHolder.current.timeout);
        changeHolder.current.sendRequest();
        changeHolder.current = null;
        setOpenDeleteBar(false);
        setOpenCheckboxBar(false);
    }

    function undo() {
        if(changeHolder.current === null) return;
        clearTimeout(changeHolder.current.timeout);
        changeHolder.current = null;
        getAllData().catch(e => console.log(e));
        setOpenDeleteBar(false);
        setOpenCheckboxBar(false);
    }

    return {
        undo,
        closeSnackbar,
        addTask,
        deleteTask,
        handleCheckBox,
        textFieldProps,
        openCheckboxBar,
        openDeleteBar,
        textInput,
        dataList,
    }
}

export default useTodolist;