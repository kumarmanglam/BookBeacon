import { createSlice } from "@reduxjs/toolkit";
import { licenses } from "../../pages/ViewLicenses/data";
import { act } from "react";


const initialState = {
    licenses: [],
    currentLicense: {},
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
        }
    }
})