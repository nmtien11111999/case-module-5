
import './App.css';
import {Route, Routes} from "react-router-dom";
import Loggin from "./pages/Loggin/Loggin";
import Register from "./pages/Register/Register";
import Student from "./pages/Student/Student";
import Teacher from "./pages/Teacher/Teacher";
import UserList from "./components/Users/UserList";

function App() {
    return (
        <Routes>
            <Route path={"/login"} element={<Loggin/>}/>
            <Route path={"/register"} element={<Register/>}/>
            <Route path={"/users"} element={<Student/>}/>
            <Route path={"/teacher"} element={<Teacher/>}/>
            <Route path={"/list"} element={<UserList/>}/>
            <Route path={"/add"} element={<Register/>}/>
        </Routes>
    );
}

export default App;
