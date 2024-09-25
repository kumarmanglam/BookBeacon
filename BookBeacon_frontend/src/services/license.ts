import axios from "axios";

export const domain = "http://localhost:3000";
export const createLicense = (data: any, custom: any) => axios.post(`${domain}/license?custom=${custom}`, { data })