import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors"; // Import cors

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json()); // Middleware to parse JSON body
app.use(cors()); // Enable CORS

// Function to connect to MongoDB
const connectDb = () => {
	mongoose
		.connect(process.env.URI)
		.then(() => console.log("Connected to MongoDB"))
		.catch((err) => console.error("MongoDB connection error:", err));
};

connectDb(); // Connect to the database

// JWT Authentication Middleware
const authenticateToken = (req, res, next) => {
	const token = req.headers["authorization"]?.split(" ")[1]; // Bearer token format

	if (!token) {
		return res
			.status(401)
			.json({ message: "Access denied. No token provided." });
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
		return res
			.status(400)
			.json({ message: "Please enter a valid username and password" });
	}

	// Here you should add code to verify the username and password (e.g., check in the database)

	// Dummy user verification for demo purposes
	if (username === "admin" && password === "password") {
		// Create a token using the username
		const token = jwt.sign({ username }, process.env.JWT_SECRET, {
			expiresIn: "1h",
		});
		return res.json({
			message: "Authentication successful!",
			token: token,
		});
	} else {
		return res.status(400).json({ message: "Invalid username or password" });
	}
});

app.get('/metrics', require('./metrics'));

app.get('/logs', require('./logs'));

// Protected dashboard route (only accessible with a valid token)
app.get("/dashboard", authenticateToken, (req, res) => {
	res.json({ message: `Welcome to your dashboard, ${req.user.username}!` });
});

// Example protected settings route
app.get("/settings", authenticateToken, (req, res) => {
	res.json({ message: `Settings for user: ${req.user.username}` });
});

// Error handler for routes not found
app.use((req, res) => {
	res.status(404).json({ message: "Route not found" });
});

// Start server on port 3000
app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
