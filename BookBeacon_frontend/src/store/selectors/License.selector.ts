import { createSelector } from "@reduxjs/toolkit";

const selectLicenseStore = (state: any) => state.license;

export const selectLicenseState = createSelector(selectLicenseStore, (state: any) => state.license)