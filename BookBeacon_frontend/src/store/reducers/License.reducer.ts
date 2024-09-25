import { createSlice } from "@reduxjs/toolkit";
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
}
const initialState: state = {
    licenses: [],
    currentLicense: {},
    isVariableConcurrency: false,
    isLicenseExisting: false,
    concurrency: 1,
    booksInBundle: [],
    licenceBooksInBundle: [],
    collectUpdatedBooks: [],
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
                    return item;
                }
                return item
            });
            console.log(books);
            state.licenceBooksInBundle = books;
        },
        addUpdatedBooks: (state, action) => {
            const data: any = state.licenceBooksInBundle;
            data.push(action.payload);
            state.licenceBooksInBundle = data;
        }
    }
})

export const { setLicense, setAllLicense, setLicenceBooksInBundle, updateLicenseBooksInBundle, addUpdatedBooks } = LicenseReducer.actions;

export default LicenseReducer.reducer;