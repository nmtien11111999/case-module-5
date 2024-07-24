import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import {toast} from "react-toastify";
import {useEffect} from "react";
import {listUser} from "../../services/Users/axios/UserAxios";


function Loggin() {
    const navigate = useNavigate();
    const users = useSelector(state => state.users.users)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listUser());
    }, [dispatch]);

    const formLoggin = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        onSubmit: values => {
            const user = users.find(u => u.username === values.username && u.password === values.password);

            if (user) {
                if (user.position === 'student') {
                    navigate('/users');
                } else if (user.position === 'teacher') {
                    navigate('/teacher');
                }
            } else {
                toast.error('Login failed');
            }
        }
    });

    return (
        <form onSubmit={formLoggin.handleSubmit}>
            <label htmlFor="username">Name:</label>
            <input
                type="text"
                id="username"
                name="username"
                onChange={formLoggin.handleChange}
                value={formLoggin.values.username}
            />

            <label htmlFor="password">Password:</label>
            <input
                type="password"
                id="password"
                name="password"
                onChange={formLoggin.handleChange}
                value={formLoggin.values.password}
            />

            <button type="submit">Login</button>
        </form>
    );
}

export default Loggin;