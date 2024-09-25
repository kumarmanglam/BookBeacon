import { configureStore, createStore } from "@reduxjs/toolkit";
import LicenseReducer from "./reducers/License.reducer";

const store = configureStore({
    reducer: {
        license: LicenseReducer,
    }
}
)

export default store;