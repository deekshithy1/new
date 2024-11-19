import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userroutes from "./routes/user.js";
import questionroutes from "./routes/question.js";
import answerroutes from "./routes/answer.js";

// Initialize express app
const app = express();
dotenv.config(); // Load environment variables

// Middleware
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

// CORS setup to allow frontend to connect (adjust origin to your frontend URL)
app.use(cors({
    origin: 'http://localhost:3000', // Adjust this if your frontend is on another port
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// API Routes
app.use("/user", userroutes);
app.use("/questions", questionroutes);
app.use("/answer", answerroutes);

// Root route
app.get("/", (req, res) => {
    res.send("Codequest is running perfect");
});

// Database connection & server start
const PORT = process.env.PORT || 5500;
const database_url = process.env.MONGODB_URL;

mongoose.connect(database_url)
    .then(() => app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    }))
    .catch((err) => {
        console.log("Database connection error: ", err.message);
        process.exit(1); // Exit if database connection fails
    });
