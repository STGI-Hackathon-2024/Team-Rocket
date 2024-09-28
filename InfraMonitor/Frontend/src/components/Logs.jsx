import React, { useState } from "react";

// Dummy log data
const dummyLogs = [
  { timestamp: '2024-09-28 12:00:00', log: 'Error: Service timeout' },
  { timestamp: '2024-09-28 12:05:00', log: 'Warning: High memory usage' },
  { timestamp: '2024-09-28 12:10:00', log: 'Info: Request served' },
  { timestamp: '2024-09-28 12:15:00', log: 'Info: New user signup' },
  { timestamp: '2024-09-28 12:20:00', log: 'Error: Database connection lost' },
  { timestamp: '2024-09-28 12:25:00', log: 'Warning: Disk space low' },
  { timestamp: '2024-09-28 12:30:00', log: 'Error: Network failure' },
  { timestamp: '2024-09-28 12:35:00', log: 'Info: File uploaded' },
  { timestamp: '2024-09-28 12:00:00', log: 'Error: Service timeout' },
  { timestamp: '2024-09-28 12:05:00', log: 'Warning: High memory usage' },
  { timestamp: '2024-09-28 12:10:00', log: 'Info: Request served' },
  { timestamp: '2024-09-28 12:15:00', log: 'Info: New user signup' },
  { timestamp: '2024-09-28 12:20:00', log: 'Error: Database connection lost' },
  { timestamp: '2024-09-28 12:25:00', log: 'Warning: Disk space low' },
  { timestamp: '2024-09-28 12:30:00', log: 'Error: Network failure' },
  { timestamp: '2024-09-28 12:35:00', log: 'Info: File uploaded' },
];

// Log severity color coding function
const getLogColor = (logType) => {
  if (logType.toLowerCase().includes('error')) return 'text-red-500';
  if (logType.toLowerCase().includes('warning')) return 'text-yellow-500';
  if (logType.toLowerCase().includes('info')) return 'text-green-500';
  return 'text-white';
};

const Logs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 10;
  const totalPages = Math.ceil(dummyLogs.length / logsPerPage);

  // Pagination logic
  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = dummyLogs.slice(indexOfFirstLog, indexOfLastLog);

  // Functions to handle page changes
  const goToPage = (page) => setCurrentPage(page);
  const nextPage = () => setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  const prevPage = () => setCurrentPage(prevPage => Math.max(prevPage - 1, 1));

  // Generate numbered page buttons
  const renderPageNumbers = () => {
    const pageNumbers = [];
    
    // Show up to the first 3 page links and the last page link
    for (let i = 1; i <= Math.min(3, totalPages); i++) {
      pageNumbers.push(
        <button 
          key={i}
          onClick={() => goToPage(i)} 
          className={`px-3 py-1 mx-1 rounded ${i === currentPage ? 'bg-gray-700 text-white' : 'bg-gray-500 text-white'}`}
        >
          {i}
        </button>
      );
    }

    // Add "..." if there are more pages
    if (totalPages > 3) {
      pageNumbers.push(
        <span key="dots" className="px-3 py-1 mx-1">...</span>
      );

      // Add the last page button
      pageNumbers.push(
        <button 
          key={totalPages}
          onClick={() => goToPage(totalPages)} 
          className={`px-3 py-1 mx-1 rounded ${totalPages === currentPage ? 'bg-gray-700 text-white' : 'bg-gray-500 text-white'}`}
        >
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div>
      <h2 className="text-center text-lg font-semibold">Logs</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full mt-4 bg-gray-800 text-white">
          <thead>
            <tr className="bg-gray-700">
              <th className="py-2 px-4 text-left">Timestamp</th>
              <th className="py-2 px-4 text-left">Log Message</th>
            </tr>
          </thead>
          <tbody>
            {currentLogs.map((log, index) => (
              <tr key={index} className="border-b border-gray-600">
                <td className="py-2 px-4">{log.timestamp}</td>
                <td className={`py-2 px-4 ${getLogColor(log.log)}`}>{log.log}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center mt-4">
        <button 
          onClick={prevPage} 
          disabled={currentPage === 1} 
          className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>

        {/* Page number buttons */}
        {renderPageNumbers()}

        <button 
          onClick={nextPage} 
          disabled={currentPage === totalPages} 
          className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Logs;
