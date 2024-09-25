import { useNavigate } from "react-router-dom"
import filteredData from "./data";
const ButtonGroup: React.FC = () => {
  const navigate = useNavigate();

  const convertToCSV = (data: any[]) => {
    const headers = Object.keys(data[0]);
    const rows = data.map(obj => Object.values(obj).join(','));
    return [headers.join(','), ...rows].join('\n');
  };
  const handleDownloadCSV = () => {
    const csvData = convertToCSV(filteredData);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'page_data.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };



  return (
    <div className="flex justify-end mb-4 mt-10 mr-16">
      <button onClick={() => navigate("/CreateLicense")} className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600">
        Create New
      </button>
      <button onClick={handleDownloadCSV} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
        Download CSV
      </button>
      <button onClick={() => navigate("/booksInLicense")}>Entitlements</button>
    </div>
  );
};

export default ButtonGroup;