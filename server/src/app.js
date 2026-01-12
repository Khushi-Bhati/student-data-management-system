import express from "express";
import cors from "cors";

import userrouter from "./routes/Userroutes.js";

import studentrouter from "./routes/Studentroutes.js";

const app = express();

// Middleware
app.use(cors()); // allow all origins (dev)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Routes
app.use("/Institute/user", userrouter);
app.use("/Institute/student", studentrouter);

export { app };
