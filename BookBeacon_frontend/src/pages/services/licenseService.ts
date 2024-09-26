import axios from 'axios';

export const fetchLicenses = async () => {
  try {
    const response = await axios.get('http://localhost:3000/licenses');
    
    const filteredData = response.data.map(({ license_name, mode,start_date,end_date}: { license_name: string; mode: string ;start_date:string;end_date:string}) => ({
      license_name,
      mode,
      start_date:start_date.slice(0, 10),  
      end_date:end_date.slice(0, 10),  
    }));

    console.log(filteredData); 
    return filteredData; 
  } catch (error) {
    console.error('Error fetching licenses:', error);
    return [];
  }
};
