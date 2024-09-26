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
    custom: any
}
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
        setCustom: (state, action) => {
            state.custom = action.payload;
        }
    }
})

export const { setLicense, setAllLicense, setConcurrency, setLicenceBooksInBundle, updateLicenseBooksInBundle, setCustom, setBooksInBundle } = LicenseReducer.actions;
export default LicenseReducer.reducer;