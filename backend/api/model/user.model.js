import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {type: String, required: true},
    username: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true},
    todolist: {type: Array}
}, {
    timestamps: true
});

const User = mongoose.model('Users', userSchema);

export default User;