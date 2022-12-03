import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import projectListReducer from "./features/projectListSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        projectList: projectListReducer,
    }
});