import './Todolist.sass';

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
        dataList,
        tasksState
    } = useTodolist();

    const taskList = (function createTaskList(dataList) {
        return dataList.map((el: DataList, i) => {
            const {id, isChecked, value, startedAt, finishedAt} = el;

            const startTime = parseTime(startedAt);
            const startDate = parseDate(startedAt)

            const doneTime = parseTime(finishedAt);
            const doneDate = parseDate(finishedAt);

            return (
                <tr key={id} className={isChecked ? 'Todolist__body-item_checked' : 'Todolist__body-item'}>
                    <td>
                        <Checkbox checked={isChecked}
                                  onChange={() => handleCheckBox(i, id)}
                                  disabled={isChecked}
                                  inputProps={{'aria-label': 'controlled'}}
                        />
                    </td>

                    <td className={isChecked ? 'Todolist__body-task_checked' : 'Todolist__body-task'}>{value}</td>

                    <td>
                        {startDate}, {startTime}
                    </td>
                    <td>

                        {finishedAt ? `${doneDate}, ${doneTime}` : 'TBD'}
                    </td>

                    <td>
                        <IconButton aria-label="delete"
                                    color="primary"
                                    onClick={() => deleteTask(i, id)}>
                            <DeleteIcon/>
                        </IconButton>
                    </td>
                </tr>
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
        <Container maxWidth="md">
            <div className='Todolist'>
                <div className='Todolist__header'>
                    <div>
                        <p>Tasks: {tasksState.count}</p>
                    </div>
                    <div className='Todolist__input-container'>
                        <TextField inputRef={textInput}
                                   label="Enter a task"
                                   variant="outlined"
                                   margin="dense"
                                   {...textFieldProps}
                        />
                        <div className='Todolist__add-button-container'>
                            <Button variant="outlined" onClick={addTask}>Add</Button>
                        </div>
                    </div>
                    <div>
                        <p>Completed: {tasksState.completed}</p>
                    </div>
                </div>
                <div className='Todolist__body'>
                    <table className='Todolist__tasks'>
                        <thead>
                        <tr>
                            <th>Done</th>
                            <th>Task</th>
                            <th>Start</th>
                            <th>End</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {taskList}
                        </tbody>
                    </table>
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
            </div>
        </Container>

    )
}