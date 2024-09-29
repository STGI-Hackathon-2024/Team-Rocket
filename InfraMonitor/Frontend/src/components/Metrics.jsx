import React from 'react';
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
  const dataClusters = [
    {
      name: 'Cluster A',
      cpuData: [30, 35, 40, 45, 50, 55, 50],
      memoryData: [55, 57, 60, 65, 70, 65, 60],
    },
    {
      name: 'Cluster B',
      cpuData: [40, 45, 50, 55, 60, 55, 50],
      memoryData: [60, 62, 65, 70, 75, 72, 68],
    },
    {
      name: 'Cluster C',
      cpuData: [35, 40, 45, 50, 55, 52, 48],
      memoryData: [58, 60, 62, 67, 70, 68, 65],
    },
    {
      name: 'Cluster D',
      cpuData: [45, 50, 55, 60, 65, 60, 55],
      memoryData: [65, 68, 70, 75, 80, 78, 75],
    },
  ];

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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 p-4 justify-center">
      {dataClusters.map((cluster, index) => (
        <div key={index} className="flex flex-col justify-center items-center w-full max-w-[550px] mx-auto">
          <h3 className="text-lg font-bold mb-2">{`${cluster.name} Metrics`}</h3>
          <Line
            data={{
              labels: ['12:00', '12:05', '12:10', '12:15', '12:20', '12:25', '12:30'],
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
