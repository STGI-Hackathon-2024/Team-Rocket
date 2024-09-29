import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Metrics = () => {
  const [dataClusters, setDataClusters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [labels, setLabels] = useState([]);

  // Function to update random data
  const updateRandomData = (data) => {
    const lastValue = data[data.length - 1];
    const randomChange = Math.floor(Math.random() * 11) - 5; // Random change between -5 and 5
    const newValue = Math.max(0, Math.min(100, lastValue + randomChange)); // Ensure it stays between 0 and 100
    return [...data.slice(1), newValue]; // Shift data and add new value at the end
  };

  useEffect(() => {
    const fetchMetrics = async () => {
      // Simulate fetching initial metrics data
      const clusters = [
        {
          name: 'Cluster A',
          cpuData: [30, 35, 40, 45, 50, 55, 50],
          memoryData: [55, 57, 60, 65, 70, 65, 60],
          httpData: [100, 80, 120, 130, 110, 120, 160],
        },
        {
          name: 'Cluster B',
          cpuData: [40, 45, 50, 55, 60, 55, 50],
          memoryData: [60, 62, 65, 70, 75, 72, 68],
          httpData: [110, 120, 110, 140, 150, 120, 110],
        },
        {
          name: 'Cluster C',
          cpuData: [35, 40, 45, 50, 55, 52, 48],
          memoryData: [58, 60, 62, 67, 70, 68, 65],
          httpData: [120, 130, 140, 130, 110, 120, 130],
        },
        {
          name: 'Cluster D',
          cpuData: [45, 50, 55, 60, 65, 60, 55],
          memoryData: [65, 68, 70, 75, 80, 78, 75],
          httpData: [130, 140, 90, 120, 100, 120, 120],
        },
      ];

      setDataClusters(clusters);
      setLoading(false);

      // Set initial labels based on current time
      const currentTime = new Date();
      const initialLabels = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(currentTime);
        date.setSeconds(currentTime.getSeconds() - (6 - i)); // 6 to 0 seconds ago
        return date.toLocaleTimeString(); // Format the time
      });
      setLabels(initialLabels);

      // Simulate real-time data update every 10 seconds
      const interval = setInterval(() => {
        setDataClusters(prevClusters =>
          prevClusters.map(cluster => ({
            ...cluster,
            cpuData: updateRandomData(cluster.cpuData),
            memoryData: updateRandomData(cluster.memoryData),
            httpData: updateRandomData(cluster.httpData),
          }))
        );

        // Update the labels for the time
        const newLabels = Array.from({ length: 7 }, (_, i) => {
          const date = new Date();
          date.setSeconds(date.getSeconds() - (6 - i)); // Keep time within the past 6 seconds
          return date.toLocaleTimeString(); // Format the time
        });
        setLabels(newLabels);
      }, 10000); // Updated to 10 seconds

      // Clear interval on component unmount
      return () => clearInterval(interval);
    };

    fetchMetrics();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
      },
    },
  };

  if (loading) {
    return <div>Loading...</div>; // Loader or spinner can be added here
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 p-4 justify-center">
      {dataClusters.map((cluster, index) => (
        <div key={index} className="flex flex-col justify-center items-center w-full max-w-[550px] mx-auto">
          <h3 className="text-lg font-bold mb-2">{`${cluster.name} Metrics`}</h3>
          <Line
            data={{
              labels: labels,
              datasets: [
                {
                  label: `CPU Usage - ${cluster.name} (%)`,
                  data: cluster.cpuData,
                  borderColor: 'rgba(75,192,192,1)',
                  backgroundColor: 'rgba(75,192,192,0.2)',
                  tension: 0.4,
                  fill: true,
                },
                {
                  label: `Memory Usage - ${cluster.name} (%)`,
                  data: cluster.memoryData,
                  borderColor: 'rgba(153,102,255,1)',
                  backgroundColor: 'rgba(153,102,255,0.2)',
                  tension: 0.4,
                  fill: true,
                },
                {
                  label: `HTTP Requests - ${cluster.name} (count)`,
                  data: cluster.httpData,
                  borderColor: 'rgba(255,99,132,1)',
                  backgroundColor: 'rgba(255,99,132,0.2)',
                  tension: 0.4,
                  fill: true,
                },
              ],
            }}
            options={{
              ...options,
              plugins: {
                ...options.plugins,
                title: {
                  display: true,
                  text: `${cluster.name} System Metrics`,
                },
              },
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default Metrics;
