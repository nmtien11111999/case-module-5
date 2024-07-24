import {configureStore} from "@reduxjs/toolkit";
import userReducer from "../Slice/UserSlice";


const UserStore = configureStore({
    reducer:{
        users: userReducer
    }
})

export default UserStore;