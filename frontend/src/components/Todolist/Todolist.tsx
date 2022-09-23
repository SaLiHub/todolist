import { Button, Checkbox, Container, IconButton, Snackbar, Stack, TextField } from "@mui/material";
import useTodolist from "../../hooks/useTodolist";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataList } from "../../types/interfaces";
import { parseDate, parseTime } from "../../helpers/helper.todolist";

export default function Todolist() {
    const {
        textInput,
        undo,
        closeSnackbar,
        addTask,
        textFieldProps,
        openCheckboxBar,
        openDeleteBar,
        handleCheckBox,
        deleteTask,
        dataList
    } = useTodolist();

    const taskList = (function createTaskList(dataList) {
        return dataList.map((el: DataList, i) => {
            const {id, isChecked, value, startedAt, finishedAt} = el;

            const startTime = parseTime(startedAt);
            const startDate = parseDate(startedAt)

            const doneTime = parseTime(finishedAt);
            const doneDate = parseDate(finishedAt);

            return (
                <li className='ToDoList__item' key={i}>
                    <Checkbox checked={isChecked}
                              onChange={() => handleCheckBox(i, id)}
                              disabled={isChecked}
                              inputProps={{'aria-label': 'controlled'}}
                    />
                    {value}
                    <span
                        className='ToDoList__item-time'>{`Started at - ${startDate}, ${startTime} `}</span>
                    ---
                    {isChecked ?
                        (<span
                            className='ToDoList__item-time'>{` Finished at - ${doneDate}, ${doneTime}`}
                                </span>) : ''}
                    <IconButton aria-label="delete"
                                color="primary"
                                disabled={isChecked}
                                onClick={() => deleteTask(i, id)}>
                        <DeleteIcon/>
                    </IconButton>
                    {isChecked ? (
                        <Button variant="outlined"
                                color="error"
                                onClick={() => deleteTask(i, id)}>
                            Force delete

                        </Button>
                    ) : ''}
                </li>
            )
        });
    })(dataList);

    function generateAction() {
        return (
            <>
                <Button color="secondary" size="small" onClick={undo}>
                    UNDO
                </Button>
                <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={closeSnackbar}
                >
                    <CloseIcon fontSize="small"/>
                </IconButton>
            </>
        )
    }

    return (
        <div className='ToDoList'>
            <Container maxWidth="sm">
                <div className='ToDoList__header'>
                    <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}>
                        <TextField inputRef={textInput}
                                   label="Enter a task"
                                   variant="outlined"
                                   margin="dense"
                                   {...textFieldProps}
                        />
                        <Button variant="outlined" onClick={addTask}>Add</Button>
                    </Stack>
                </div>
                <div className='TodoList__body'>
                    <ol>
                        {taskList}
                    </ol>
                </div>
                <Snackbar
                    open={openDeleteBar}
                    message="Task deleted"
                    action={generateAction()}
                />
                <Snackbar
                    open={openCheckboxBar}
                    message="Task finished"
                    action={generateAction()}
                />
            </Container>
        </div>
    )
}