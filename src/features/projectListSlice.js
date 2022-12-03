import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";



const initialState = {
    projectList: []
};

export const projectListSlice = createSlice({
    name: 'projectList',
    initialState,
    reducers: {
        setProjectList: (state, action) => {
            state.projectList = action.payload;
        }
    }


});

export const selectedProjectList = (state) => state.projectList.projectList;

export const { setProjectList } = projectListSlice.actions;

export default projectListSlice.reducer;