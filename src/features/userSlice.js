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
            console.log("login action", action.payload);
            localStorage.setItem("user", JSON.stringify(action.payload.id));
            state.user = action.payload;

        },
        logout: (state, action) => {
            localStorage.removeItem("user");
            state.user = null;
        },
        addProjectToUser: (state, action) => {
            // state.user.projectIDList.push(action.payload);
            const userInfo = state.user;
            userInfo.projectIDList.push(action.payload);

            console.log("addProjectToUser userInfo", userInfo);
            console.log("addProjectToUser state", state.user);
            console.log("addProjectToUser action", action.payload);

            const res2 = fetch(`http://localhost:8000/userList/${state.user.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userInfo),
            }).then((res) => {
                // setIsPending(false);
                // setnextPage(1);
                // history("/projects");
                return res.json();
            });
            console.log(res2, 'userInfo');
        },
    }
});

export const userInfo = (state) => state.user.user;
export const { login, logout, addProjectToUser } = userSlice.actions;
export default userSlice.reducer;