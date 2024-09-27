import { createSlice } from "@reduxjs/toolkit";
import { enableMapSet } from 'immer';
enableMapSet();
interface state {
    licenses: any,
    currentLicense: any,
    isVariableConcurrency: any,
    isLicenseExisting: any,
    concurrency: any,
    booksInBundle: any,
    collectUpdatedBooks: any,
    bundleName: any,
    bundleId: any,
    isEditing: any,
    custom: any,
    licenseId: any,
    newLicenseData: any,
    isUserLoggedIn: boolean,
    mode: any,

}
const today = new Date().toISOString().split("T")[0];
const initialState: state = {
    licenses: [],
    currentLicense: {},
    isVariableConcurrency: false,
    isLicenseExisting: false,
    isUserLoggedIn: false,
    concurrency: 1,
    booksInBundle: [],
    collectUpdatedBooks: {},
    bundleName: "",
    bundleId: "",
    isEditing: false,
    custom: "default",
    licenseId: "",
    newLicenseData: {
        "license_name": "",
        "bundle_id": "",
        "mode": "premium",
        "start_date": "",
        "end_date": "",
        "purchase_date": today,
    },
    mode: "",
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
            console.log(action.payload);
            state.booksInBundle = action.payload;
        },
        setConcurrency: (state, action) => {
            state.concurrency = action.payload;
        },
        setBundleId: (state, action) => {
            state.bundleId = action.payload
        },
        setIsUserLoggedIn: (state, action) => {
            state.isUserLoggedIn = action.payload;
        },
        updateLicenseBooksInBundle: (state, action) => {
            let book_id: any = action.payload.id;
            let concurrency = action.payload.concurrency;
            console.log(book_id);
            console.log(concurrency);
            let books: any = state.booksInBundle?.map((item: any) => {
                if (item?.book_id == book_id) {
                    item.concurrency = concurrency;
                    // let updatedBooks = state.collectUpdatedBooks
                    // updatedBooks[item?.book_id] = item;
                    state.collectUpdatedBooks[item?.book_id] = item;
                    return item;
                }
                return item
            });
            console.log(books);
            state.booksInBundle = books;
        },
        setCollectUpdatedBooks: (state, action) => {
            state.collectUpdatedBooks = action.payload;
        },
        setIsEditing: (state, action) => {
            state.isEditing = action.payload;
        },
        setCustom: (state, action) => {
            state.custom = action.payload;
        },
        setLicenseId: (state, action) => {
            state.licenseId = action.payload;
        },
        setNewLicenseData: (state, action: any) => {
            console.log(action.payload);
            let data = state.newLicenseData;
            const name = action.payload.name;
            const value = action.payload.value;
            let ob: any = {};
            ob[`${name}`] = value
            console.log(ob);
            data[`${name}`] = value
            state.newLicenseData = data;
        },
        setBundleName: (state, action) => {
            state.bundleName = action.payload;
        },
        setMode: (state, action) => {
            state.mode = action.payload;
        },
    }
})


export const { setLicense, setAllLicense, setConcurrency, updateLicenseBooksInBundle, setCustom, setLicenseId, setIsUserLoggedIn, setBooksInBundle, setNewLicenseData, setBundleName, setIsEditing, setBundleId, setCollectUpdatedBooks, setMode } = LicenseReducer.actions;

export default LicenseReducer.reducer;