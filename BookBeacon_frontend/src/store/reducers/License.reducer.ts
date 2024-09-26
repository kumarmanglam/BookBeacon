import { createSlice } from "@reduxjs/toolkit";
import { licenses } from "../../pages/ViewLicenses/data";
import { act } from "react";


const initialState = {
    licenses: [],
    currentLicense: {},
    isVariableConcurrency: false,
    isLicenseExisting: false,
    concurrency: 1,
    booksInBundle: [],
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
        setBooksInBundle: (state, action) => {
            state.booksInBundle = action.payload;
        }
    }
})

export const { setLicense, setAllLicense, setBooksInBundle } = LicenseReducer.actions;

export default LicenseReducer.reducer;