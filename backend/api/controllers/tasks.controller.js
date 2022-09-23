import User from "../model/user.model.js";

export default class TasksController {
    static async apiGetTodolist(req, res) {
        const {email} = req.user;
        try {
            const {todolist} = await User.findOne({email});
            res.json({done: true, todolist}).status(200);
        } catch (e) {
            res.json({done: false, message: e.message}).status(500);
        }
    }

    static async apiPostTask(req, res) {
        const {email} = req.user;
        const newTask = req.body.newTask;
        try {
            const {todolist} = await User.findOne({email});
            await User.updateOne({email}, {todolist: [...todolist, newTask]});
            res.json({done: true, message: 'Task added'}).status(200);
        } catch (e) {
            res.json({done: false, message: e.message}).status(500);
        }
    }

    static async apiDeleteTask(req, res) {
        const {email} = req.user;
        const id = Number(req.params.id);
        try {
            const {todolist} = await User.findOne({email});
            const newTodolist = todolist.filter((task) => task.id !== id);
            await User.updateOne({email}, {todolist: [...newTodolist]});
            res.json({done: true, message: 'Task deleted'}).status(200);
        } catch (e) {
            res.json({done: false, message: e.message}).status(500);
        }
    }

    static async apiCheckTask(req, res) {
        const {email} = req.user;
        const {finishedAt} = req.body;
        console.log(req.body)
        const id = Number(req.params.id);
        try {
            const {todolist} = await User.findOne({email});
            todolist.forEach((task) => {
                console.log(task.id === id)
                if (task.id === id) {
                    task.isChecked = true;
                    task.finishedAt = finishedAt;
                }
            });
            await User.updateOne({email}, {todolist});
            res.json({done: true, message: 'Task checked'}).status(200);
        } catch (e) {
            console.log(e)
            res.json({done: false, message: e.message}).status(500);
        }
    }
}
