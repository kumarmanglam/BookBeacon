import { createSlice } from "@reduxjs/toolkit";
import { licenses } from "../../pages/ViewLicenses/data";
import { act } from "react";


const initialState = {
    licenses: [],
    currentLicense: {},
    isLicenseExisting: false,
    concurrency: 1,
    booksBundle: [],
    bundleName: "",
    bundleId: "",
};

const LicenseReducer = createSlice({
    name: "license",
    initialState,
    reducers: {
        setLicense: (state, action) => {
            state.currentLicense = action.payload
        },
        setAllLicense: (state, action) => {
            state.licenses = action.payload;
        },
        setConcurrency: (state, action) => {
            state.concurrency = action.payload;
        }
    }
})