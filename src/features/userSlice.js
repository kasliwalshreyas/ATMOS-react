import { createSlice } from '@reduxjs/toolkit';

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
            console.log("login action", action.payload[0]);
            state.user = action.payload[0];

        },
        logout: (state, action) => {
            state.user = action.payload[0];
        },
        addProjectToUser: (state, action) => {
            state.user.projectIDList.push(action.payload);
        },
    }
});

export const userInfo = (state) => state.user.user;
export const { login, logout, addProjectToUser } = userSlice.actions;
export default userSlice.reducer;