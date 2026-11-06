import { configureStore } from "@reduxjs/toolkit";
import authslice from "./authslice"

const store = configureStore({
    reducer: {
        auth : authslice,
        //Todo: add more slices for post
    }
})
export default store;