import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import { updateUser} from "../../services/Users/axios/UserAxios";
import {toast} from "react-toastify";
import Swal from "sweetalert2";
import {validateFrom} from "../../pages/Register/Register";


function UserEdit(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formUser = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            position: "student"
        },
        validationSchema: validateFrom,
        onSubmit: (values) => {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, update it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(updateUser(values));
                    navigate('/users');
                    toast.success("Sửa thành công");
                } else {
                    toast.error("Cập nhật thất bại");
                }
            });
        }
    });

    return (
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
    )
}

export default UserEdit;