import axios from "axios";

export const domain = "http://localhost:3000";
export const createLicense = (data: any, custom: any) => axios.post(`${domain}/license?custom=${custom}`, { data })

export const editLicenseCustomDefault = (data: any) => axios.put(`${domain}/license?custom=default`, { data })

export const editLicenseCustomVariable = (data: any) => axios.put(`${domain}/license?custom=variable`, { data })

