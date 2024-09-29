import axios from 'axios';

const INFLUXDB_URL = process.env.INFLUXDB_URL; // Your InfluxDB endpoint

export const getLogs = async (req, res) => {
    try {
        // Fetch logs from InfluxDB
        const response = await axios.get(`${INFLUXDB_URL}/api/v2/query`, {
            params: {
                org: process.env.INFLUXDB_ORG,
                bucket: process.env.INFLUXDB_BUCKET,
                // Adjust your Flux query as needed
                q: `from(bucket:${bucket}) |> range(start: -1h)`,
            },
            headers: {
                Authorization: `Token ${process.env.INFLUXDB_TOKEN}`,
                'Content-Type': 'application/json',
            }
        });

        const logs = response.data; // Process this as necessary
        res.json(logs); // Send logs as JSON response
    } catch (error) {
        console.error('Error fetching logs:', error);
        res.status(500).json({ message: "Failed to fetch logs." });
    }
};
