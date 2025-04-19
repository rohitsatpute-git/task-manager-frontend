import { createSlice } from "@reduxjs/toolkit";

const userReducer = createSlice({
    name: 'user',
    initialState: {
        userId: null,
        email: null
    },
    reducers: {
        setUser: (state, action) => {
            state.userId = action.payload._id;
            state.email = action.payload.email;
        },
    }
})

export const { setUser } = userReducer.actions;
export default userReducer.reducer;