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
    licenceBooksInBundle: any,
    collectUpdatedBooks: any,
    bundleName: any,
    bundleId: any,
    isEditing: any,
    custom: any,
    newLicenseData: any
}
const today = new Date().toISOString().split("T")[0];
const initialState: state = {
    licenses: [],
    currentLicense: {},
    isVariableConcurrency: false,
    isLicenseExisting: false,
    concurrency: 1,
    booksInBundle: [],
    licenceBooksInBundle: [],
    collectUpdatedBooks: {}, // should be like set (no duplicates object by book_id)
    bundleName: "",
    bundleId: "",
    isEditing: false,
    custom: "default",
    newLicenseData: {
        "license_name": "",
        "bundle_id": "",
        "mode": "premium",
        "start_date": "",
        "end_date": "",
        "purchase_date": today,
    },
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
        },
        setConcurrency: (state, action) => {
            state.concurrency = action.payload;
        },
        setLicenceBooksInBundle: (state, action) => {
            state.licenceBooksInBundle = action.payload;
        },
        updateLicenseBooksInBundle: (state, action) => {
            let book_id: any = action.payload.id;
            let concurrency = action.payload.concurrency;
            console.log(book_id);
            console.log(concurrency);
            let books: any = state.licenceBooksInBundle?.map((item: any) => {
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
            state.licenceBooksInBundle = books;
        },
        setCollectUpdatedBooks: (state, action) => {
            state.collectUpdatedBooks = action.payload;
        },
        setBundleId: (state, action) => {
            state.bundleId = action.payload;
        },
        setIsEditing: (state, action) => {
            state.isEditing = action.payload;
        },
        setCustom: (state, action) => {
            state.custom = action.payload;
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
    }
})

export const { setLicense, setAllLicense, setConcurrency, setLicenceBooksInBundle, updateLicenseBooksInBundle, setCustom, setBooksInBundle, setNewLicenseData, setBundleName,setCollectUpdatedBooks } = LicenseReducer.actions;
export default LicenseReducer.reducer;