import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth";
import addJobSlice from "./job";
import applyJobSlice from "./apply";
const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        job: addJobSlice.reducer,
        applyJob: applyJobSlice.reducer
    }
})
export default store;