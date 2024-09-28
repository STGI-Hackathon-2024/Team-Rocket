import axios from "axios";

const getMetrics = async (req, res) => {
    try{
        const response  = await axios.get('http://localhost:9090/metrics');
        const data = response.data.data.result;
        const metrics = data.map((metric) => {
            return {
                metric: metric.metric,
                value: metric.value
            };
        });
        res.json(metrics);
    }
    catch(error){
        res.status(500).send('Prometheus Server Error');
    }
}

export default getMetrics;