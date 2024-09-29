import React, { useState } from 'react';
import Navbar from './Navbar';
import Logs from './Logs';
import Metrics from './Metrics';

const Dashboard = ({ username, onLogout }) => {
  const [showMetrics, setShowMetrics] = useState(true); // State to toggle between metrics and logs

  // Dummy data for metrics and logs (replace with actual data from API later)




  return (
    <div className="bg-gradient-to-br from-slate-900 to-stone-900 min-h-screen text-white  justify-between">
      <Navbar username={username} onLogout={onLogout} />
      
      <div className='flex flex-col'>
        <div className="flex justify-center mt-8">
          <div className="grid grid-cols-2 gap-10">
            <button
              className={`px-4 py-2 border-2 border-gray-400 rounded-xl ${showMetrics ? 'bg-gray-800' : ''}`}
              onClick={() => setShowMetrics(true)} // Show metrics on click
            >
              Metrics
            </button>
            <button
              className={`px-4 py-2 border-2 border-gray-400 rounded-xl ${!showMetrics ? 'bg-gray-800' : ''}`}
              onClick={() => setShowMetrics(false)} // Show logs on click
            >
              Logs
            </button>
          </div>
        </div>

        <div className="mt-8 mx-4">
          {showMetrics ? <Metrics/> : <Logs/>}
        </div>

      </div>

    </div>
  );
};

export default Dashboard;
