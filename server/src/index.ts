import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./router";

dotenv.config();

const app: Express = express();

// Connect To Mongo
const mongoURL: string = process.env.MONGOURL as string;
mongoose
    .connect(mongoURL)
    .then(() => {
        console.log("mongo connected.");
    })
    .catch((error) => {
        console.log(error);
    });

// Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rules for API
app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    if (req.method == "OPTIONS") {
        res.header(
            "Access-Control-Allow-Methods",
            "PUT, POST, PATCH, DELETE, GET"
        );
        return res.status(200).json({});
    }

    next();
});
// app.use(cors)
// Routes
app.use("/users", router);
app.get("/", (req, res) => {
    res.send("here");
});
// Error Handling
app.use((req, res, next) => {
    const error = new Error("not found");

    return res.status(404).json({
        message: error.message,
    });
});

// Listen for Requests
app.listen(() => {
    console.log(`[server]: Server is running at https://localhost:1337`);
});
