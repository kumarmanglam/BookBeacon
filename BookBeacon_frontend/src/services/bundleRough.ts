import axios from "axios";


export const fetchBooksById = async (id: number) => {
    console.log("id " + id)
    const data = await axios.get(`http://localhost:3000/booksByBundleId/${id}`)
    console.log(data);
    return data;
}