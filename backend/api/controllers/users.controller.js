import User from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default class UsersController {
    static async apiPostUser(req, res) {
        try {
            const data = req.body;
            const {password, username, email} = req.body;

            // Hash password
            data.password = await bcrypt.hash(password, 5);

            const usernameExists = await User.findOne({username}).exec() !== null;
            const userEmailExists = await User.findOne({email}).exec() !== null;

            if (userEmailExists) {
                res.json({
                    done: false,
                    message: "Account with the same email already exist"
                })
                return;
            }

            if (usernameExists) {
                res.json({
                    done: false,
                    message: "Account with the same username already exist"
                })
                return;
            }

            const newUser = new User(data);

            newUser.save()
                .then(() => res.json({done: true}))
                .catch(err => res.status(400).json('Alert: ' + err));
        } catch (err) {
            res.send(err)
        }
    }

    static async apiValidateUser(req, res) {
        try {
            const {email, password, isChecked} = req.body;
            const user = await User.findOne({email}).exec();

            if (user) {
                const {password: hash} = user;
                bcrypt.compare(password, hash, (err, result) => {
                    if (result) {
                        let token;
                        if (isChecked) {
                            token = jwt.sign({email}, process.env.TOKEN_KEY);
                        } else {
                            // Create expired token
                            token = jwt.sign({email}, process.env.TOKEN_KEY, {expiresIn: 60 * 60 * 12});
                        }
                        res.cookie(`JWT_TOKEN=Bearer ${token}; httponly;`).json({
                            done: true,
                            token
                        })
                    } else {
                        res.json({done: false, message: 'Wrong password'});
                    }
                })
            } else {
                res.json({
                    done: false,
                    message: 'No user under that email was found'
                })
                return;
            }

        } catch (e) {
            console.log(e);
            res.json(e)
        }
    }

    static async apiAuthenticateToken(req, res, next) {
        const authHeader = req.headers.cookie;
        const token = authHeader && authHeader.split(' ')[1];

        jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
            if (err) {
                res.json({done: false, message: err.message});
            } else {
                req.user = user;
                next();
            }
        })
    }

    static async apiGetUser(req, res) {
        try {
            const {email} = req.user;
            const user = await User.findOne({email}).exec();
            const {username} = user;
            res.json({done: true, username});
        } catch (e) {
            console.log(e)
            res.json({done: false, message: e.message})
        }

    }
}