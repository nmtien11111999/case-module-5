import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const apiURL = "https://669f5d7fb132e2c136fd8fed.mockapi.io/users"

export const listUser = createAsyncThunk('listUser',async() => {
    const response = await axios.get(apiURL);
    return response.data;
})

export const addUser = createAsyncThunk('addUser',async(user) => {
    const response = await axios.post(apiURL,user);
    return response.data;
})

export const updateUser = createAsyncThunk('updateUser',async(user) => {
    const response = await axios.put(`${apiURL}/${user.id}`,user);
    return response.data;
})

export const deleteUser = createAsyncThunk('deleteUser',async(user) => {
    await axios.delete(`${apiURL}/${user.id}`);
})