import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cors from "cors"; // Import cors
import axios from "axios";
import logsRouter from './routes/logs.js';

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json()); // Middleware to parse JSON body
app.use(cors()); // Enable CORS


import { InfluxDB } from '@influxdata/influxdb-client';

const INFLUXDB_URL = process.env.INFLUXDB_URL
const INFLUXDB_ORG = process.env.INFLUXDB_ORG
const INFLUXDB_BUCKET = process.env.INFLUXDB_BUCKET
const INFLUXDB_TOKEN = process.env.INFLUXDB_TOKEN
const influxDB = new InfluxDB({
    url: `${INFLUXDB_URL}`,
    token: `${INFLUXDB_TOKEN}`,
});
const queryApi = influxDB.getQueryApi(`${INFLUXDB_ORG}`);


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


app.get('/api/data', async (req, res) => {
    const query = `from(bucket: "Team Rocket")
  |> range(start: -1h, stop: now())
  |> aggregateWindow(every: 5m, fn: mean, createEmpty: false)
  |> yield(name: "mean")`;

    try {
        console.log(1);
        const data = await queryApi.collectRows(query);
        console.log(2);
        // res.json(data);
        console.log(3);
        console.log(data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error querying InfluxDB');
    }
});


const PROMETHEUS_URL = process.env.PROMETHEUS_URL;
const queryPrometheus = async (query) => {
    try {
        const response = await axios.get(PROMETHEUS_URL, {
            params: {
                query: query
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error querying Prometheus:', error);
        throw error;
    }
};

// Route to get CPU usage metrics from Prometheus
app.get('/metrics/cpu', async (req, res) => {
    const query = 'rate(node_cpu_seconds_total[1m])';
    try {
        const data = await queryPrometheus(query);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to query Prometheus for CPU usage' });
    }
});

// Route to get memory usage metrics from Prometheus
app.get('/metrics/memory', async (req, res) => {
    const query = 'node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes * 100';
    try {
        const data = await queryPrometheus(query);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to query Prometheus for memory usage' });
    }
});

// Route to get HTTP request duration metrics
app.get('/metrics/http_requests', async (req, res) => {
    const query = 'rate(http_request_duration_seconds_bucket[5m])';
    try {
        const data = await queryPrometheus(query);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to query Prometheus for HTTP request durations' });
    }
});

// General route to pass custom queries to Prometheus
app.get('/metrics/query', async (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.status(400).json({ error: 'Query parameter "q" is required' });
    }

    try {
        const data = await queryPrometheus(query);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to query Prometheus' });
    }
});



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
    console.log("Org:", process.env.INFLUXDB_ORG);
    console.log("Bucket:", process.env.INFLUXDB_BUCKET);
    console.log("Token:", process.env.INFLUXDB_TOKEN);
    console.log("URL:", process.env.INFLUXDB_URL);

});
