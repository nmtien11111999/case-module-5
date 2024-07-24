import * as Yup from 'yup';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {useFormik} from "formik";
import {addUser} from "../../services/Users/axios/UserAxios";
import {toast} from "react-toastify";
import Swal from "sweetalert2";


export const validateFrom = Yup.object().shape({
    username: Yup.string()
        .required('Ten khong de trong')
        .min(5, 'Ten phai co hon 5 ky tu')
        .max(20, 'Ten toi da la 20 ky tu'),
    email: Yup.string()
        .email('dia chi email khong hop le')
        .required('Email khong duoc de trong'),
    password: Yup.string()
        .required('Mat khau khong duoc de trong')
        .min(8, 'Password should be at least 8 characters long')
        .matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character')
})

function Register() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const users = useSelector(state => state.users.users);


    const formUser = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            position: "student"
        },
        validationSchema: validateFrom,
        onSubmit: (values) => {
            const user = users.find(user => user.id === values.id);
            if (user) {
                dispatch(addUser(values));
                Swal.fire({
                    title: 'Tao thanh cong!',
                    text: 'Ban da tao thanh cong tai khoan',
                    icon:'success',
                    confirmButtonText: 'Okay'
                })
                navigate('/login');
            } else {
                formUser.setErrors({username: 'tai khoan da ton tai'});
            }
        }
    });

    return (
        <>
            <form onSubmit={formUser.handleSubmit}>
                <label>Name:</label>
                <input type="text" name="username" onChange={formUser.handleChange} value={formUser.values.username}/>
                {formUser.errors.username && <p>{formUser.errors.username}</p>}
                <label>Email:</label>
                <input type="text" name="email" onChange={formUser.handleChange} value={formUser.values.email}/>
                {formUser.errors.email && <p>{formUser.errors.email}</p>}
                <label>Password:</label>
                <input type="text" name="password" onChange={formUser.handleChange} value={formUser.values.password}/>
                {formUser.errors.password && <p>{formUser.errors.password}</p>}
                <button type={"submit"}>Add</button>
            </form>
        </>
    )
}

export default Register;