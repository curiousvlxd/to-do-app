import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import https from "https";
import fs from "fs";
import config from "../client/src/config/main.js";
import router from "./routes/ToDoRoute.js";

const app = express();

var privateKey  = fs.readFileSync('certs/localhost.key', 'utf8');
var certificate = fs.readFileSync('certs/localhost.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};

mongoose
    .connect(config.mongo, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() =>{
        console.log("Mongodb Connected...")
        server();
    })
    .catch((err) => console.error(err));

const server = () => {
    app.use(express.json());
    app.use(cors());
    app.use(router);
    https.createServer(credentials, app)
    .listen(config.PORT, () => {
    console.log(`Server running at https://localhost:${config.PORT}`);
});
}
