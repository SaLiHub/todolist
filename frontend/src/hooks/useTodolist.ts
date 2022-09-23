import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ChangeHolder, DataList, FieldProps, PendingState } from "../types/interfaces";

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
        const {data} = await axios.get('http://localhost:3001/api/v1/todolist', {withCredentials: true});
        if (data.done) setDataList(data.todolist);
        else console.log(data.message);
    }
    
    useEffect(() => {
        // Make request for initial data
        getAllData().catch(e => console.log(e));
    }, [])

    function addTask() {
        if (null === textInput.current) return;

        if (!textInput.current.value) {
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

        const newTask = {
            id: Date.now(),
            isChecked: false,
            value: textInput.current.value,
            startedAt: (new Date()).toString(),
        };

        setDataList([...dataList, newTask]);

        axios.post('http://localhost:3001/api/v1/todolist/add', {newTask}, {withCredentials: true})
            .then((res) => {
                // Add new data to the dataList
                console.log(res.data.message)
            }).catch(e => console.log(e))

        textInput.current.value = ''; // Reset input value
        textInput.current.focus();
    }

    async function sendRequest({id, action, finishedAt}: PendingState, closeSnack = true) {
        let response;

        if (action === 'delete') {
            response = await axios.delete('http://localhost:3001/api/v1/todolist/delete/' + id, {withCredentials: true})
        } else {
            response = await axios.patch('http://localhost:3001/api/v1/todolist/check/' + id, {finishedAt: finishedAt}, {withCredentials: true})
        }

        console.log(response.data.message)

        if (closeSnack) {
            console.log(closeSnack);
            changeHolder.current = null;
            setOpenDeleteBar(false);
            setOpenCheckboxBar(false);
        }
    }

    function handlePendingState({id, action, finishedAt}: PendingState) {
        // If an action was made during timeout
        if (changeHolder.current !== null) {
            clearTimeout(changeHolder.current.timeout);
            // Execute previous action
            changeHolder.current.sendRequest(false);
        }

        // Create a new timeout for the current action
        changeHolder.current = {
            timeout: setTimeout(() => sendRequest({id, action, finishedAt}), 6000),
            sendRequest: (closeSnack = true) => sendRequest({id, action, finishedAt}, closeSnack)
        }
    }

    function deleteTask(i: number, id: number) {
        dataList.splice(i, 1);
        setDataList([...dataList]);

        handlePendingState({action: 'delete', id});

        // Open new Snackbar
        setOpenDeleteBar(true);
    }

    function handleCheckBox(i: number, id: number) {
        dataList[i].isChecked = !dataList[i].isChecked;
        const finishedAt = new Date().toString();
        dataList[i].finishedAt = finishedAt;
        setDataList([...dataList])

        handlePendingState({action: 'check', id, finishedAt});

        // Open new Snackbar
        setOpenCheckboxBar(true);
    }

    function closeSnackbar() {
        if (changeHolder.current === null) return;
        clearTimeout(changeHolder.current.timeout);
        changeHolder.current.sendRequest();
    }

    function undo() {
        if (changeHolder.current === null) return;
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