import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
};

// export const fetchUser = createAsyncThunk('user/fetchUser', async (email) => {
//     const response = await fetch('http://localhost:8000/userList?emailId=' + email);
//     const data = await response.json();
//     return data;
// });


export const userSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        },
    }
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;