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
  const data = {
    labels: ['12:00', '12:05', '12:10', '12:15', '12:20', '12:25', '12:30'], // Time labels
    datasets: [
      {
        label: 'CPU Usage (%)',
        data: [35, 45, 50, 55, 60, 50, 40], // CPU usage over time
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Memory Usage (%)',
        data: [60, 62, 64, 70, 75, 70, 68], // Memory usage over time
        borderColor: 'rgba(153,102,255,1)',
        backgroundColor: 'rgba(153,102,255,0.2)',
        tension: 0.4,
        fill: true,
      }
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'System Metrics',
      },
    },
  };

  return (
    <div className="flex justify-center p-4">
      <div className="w-[80%]">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default Metrics;
