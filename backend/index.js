import app from "./server.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

// Configure dotenv
dotenv.config();

const port = process.env.PORT || 3002;
const URL = process.env.URL;

(async function start() {
    try {
        await mongoose.connect(URL);
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`)
        });
    } catch (e) {
        console.log(e)
    }

})();
