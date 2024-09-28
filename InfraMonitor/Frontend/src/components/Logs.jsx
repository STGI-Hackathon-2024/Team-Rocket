import React from "react";



const dummyLogs = [
    { timestamp: '2024-09-28 12:00:00', log: 'Error: Service timeout' },
    { timestamp: '2024-09-28 12:05:00', log: 'Warning: High memory usage' },
    { timestamp: '2024-09-28 12:10:00', log: 'Info: Request served' }
  ];

const Logs = () => {


    return (
		<div>
			<h2 className="text-center text-lg font-semibold">Logs</h2>
			<ul className="mt-4">
				{dummyLogs.map((log, index) => (
					<li key={index} className="border-b border-gray-600 py-2">
						<strong>{log.timestamp}:</strong> {log.log}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Logs;
