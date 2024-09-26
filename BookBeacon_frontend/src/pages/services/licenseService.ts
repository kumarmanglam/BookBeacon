import axios from 'axios';

export const fetchLicenses = async () => {
  try {
    const response = await axios.get('http://localhost:3000/licenses');

    const filteredData = response.data.map((license: { license_name: string; mode: string; start_date: string | null; end_date: string | null }) => {
      const { license_name, mode, start_date, end_date } = license;
      
      return {
        license_name,
        mode,
        start_date: start_date ? start_date.slice(0, 10) : 'N/A',  // Check if start_date exists before slicing
        end_date: end_date ? end_date.slice(0, 10) : 'N/A',        // Check if end_date exists before slicing
      };
    });

    console.log(filteredData);
    return filteredData;
  } catch (error) {
    console.error('Error fetching licenses:', error);
    return [];
  }
};
