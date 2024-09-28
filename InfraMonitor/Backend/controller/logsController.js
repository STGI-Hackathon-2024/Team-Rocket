const axios = require('axios');

const getLogs = async (req, res) => {
    try{
        const response  = await axios.get('http://localhost:9090/logs'); // change to loki
        const data = response.data.data.result;
        const logs = data.map((log) => {
            return {
                log: log.log,
                value: log.value
            };
        });
        res.json(logs);
    }
    catch(error){
        res.status(500).send('Log Server Error'); // change to loki
    }
}

module.exports = getLogs;