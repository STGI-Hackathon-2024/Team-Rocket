import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cors from "cors"; // Import cors
import logsRouter from './routes/logs.js';

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json()); // Middleware to parse JSON body
app.use(cors()); // Enable CORS

// JWT Authentication Middleware
const authenticateToken = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1]; // Bearer token format

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid or expired token." });
        }
        req.user = user; // Store the decoded user information in the request object
        next(); // Call the next middleware or route handler
    });
};

// Login route for JWT-based authentication
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    // Basic check for missing fields
    if (!username || !password) {
        return res.status(400).json({ message: "Please enter a valid username and password" });
    }

    // Dummy user verification for demo purposes
    if (username === "admin" && password === "password") {
        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1h" });
        return res.json({ message: "Authentication successful!", token });
    } else {
        return res.status(400).json({ message: "Invalid username or password" });
    }
});

app.use('/logs', authenticateToken, logsRouter);

// Error handler for routes not found
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

// Start server on port 3000
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
