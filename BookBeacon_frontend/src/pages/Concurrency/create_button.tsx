/* eslint-disable @typescript-eslint/no-explicit-any */
// pages/Concurrency/create_button.tsx

import { useNavigate } from 'react-router-dom';

import { booksData } from './data';

const ButtonGroup: React.FC = () => {
  const navigate = useNavigate();

  const convertToCSV = (data: any[]) => {
    const headers = Object.keys(data[0]);
    const rows = data.map(obj => Object.values(obj).join(','));
    return [headers.join(','), ...rows].join('\n');
  };

  const handleDownloadCSV = () => {
    const csvData = convertToCSV(booksData);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'concurrency_data.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleSave = () => {
    navigate('/createLicence');
  };

  return (
    <div className="flex justify-end gap-5">
      <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Save
      </button>
      <button onClick={handleDownloadCSV} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
        Download as CSV
      </button>
    </div>
  );
};

export default ButtonGroup;
