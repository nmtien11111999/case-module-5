import {createSlice} from "@reduxjs/toolkit";
import {addUser, deleteUser, listUser, updateUser} from "../axios/UserAxios";

const inittial = {
    users: []
}

const UserSlice = createSlice({
    name: 'users',
    initialState: inittial,
    reducers: {},
    extraReducers: (builder) =>{
        builder
            .addCase(listUser.fulfilled,(state,action) => {
                state.users = action.payload
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.users.push(action.payload)
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                const index = state.users.findIndex(user => user.id === action.payload.id)
                state.users[index] = action.payload
            })
            .addCase(deleteUser.fulfilled,(state,action)=> {
                state.users = state.users.filter(user => user.id!== action.payload)
            })
    }
})

export default UserSlice.reducer;