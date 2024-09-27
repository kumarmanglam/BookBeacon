import { createSelector } from "@reduxjs/toolkit";

const selectLicenseStore = (state: any) => state.license;

export const selectLicenseState = createSelector(selectLicenseStore, (state: any) => state)
export const booksInBundle = createSelector(selectLicenseState, (state: any) => state.booksInBundle);
export const newLicenseData = createSelector(selectLicenseState, (state: any) => state.newLicenseData);
