import { useNavigate } from "react-router-dom";
import { fetchLicenses } from "../services/licenseService";

const ButtonGroup: React.FC = () => {
  const navigate = useNavigate();

  const convertToCSV = (data: any[]) => {
    if (!Array.isArray(data) || data.length === 0) {
      console.error("No data available or data is not an array");
      return '';
    }

    const filteredData = data.map(({ license_name, mode }) => ({
      license_name,
      mode,
    }));

    const headers = Object.keys(filteredData[0]);
    const rows = filteredData.map(obj => Object.values(obj).join(','));
    return [headers.join(','), ...rows].join('\n');
  };

  const handleDownloadCSV = async () => {
    try {
      // Fetch the licenses data
      const licensesData = await fetchLicenses();

      // Ensure the data is an array
      if (!Array.isArray(licensesData)) {
        console.error("Fetched data is not an array");
        return;
      }

      // Convert the data to CSV
      const csvData = convertToCSV(licensesData);

      // Create a blob and trigger download
      const blob = new Blob([csvData], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.setAttribute('hidden', '');
      a.setAttribute('href', url);
      a.setAttribute('download', 'licenses_data.csv');
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error fetching or processing licenses data", error);
    }
  };

  return (
    <div className="flex justify-end mb-4 mt-10 mr-16">
      <button onClick={() => navigate("/createLicense")} className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600">
        Create New
      </button>
      <button onClick={handleDownloadCSV} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
        Download CSV
      </button>
    </div>
  );
};

export default ButtonGroup;
