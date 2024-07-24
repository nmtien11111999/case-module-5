import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {deleteUser, listUser} from "../../services/Users/axios/UserAxios";
import Swal from "sweetalert2";
import {toast} from "react-toastify";

function UserList() {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users.users);

    useEffect(() => {
        dispatch(listUser());
    }, [dispatch]);

    const handleDelete = (user) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteUser(user))
                    .then(() => {
                        Swal.fire({
                            title: 'Deleted!',
                            text: 'User has been deleted.',
                            icon: 'success',
                            timer: 1500,
                            showConfirmButton: false,
                        });
                        dispatch(listUser());
                    })
                    .catch((error) => {
                        Swal.fire({
                            title: 'Error!',
                            text: `Delete failed: ${error.message}`,
                            icon: 'error',
                            timer: 1500,
                            showConfirmButton: false,
                        });
                    });
            } else {
                Swal.fire({
                    title: 'Cancelled',
                    text: 'Your user is safe!',
                    icon: 'error',
                    timer: 1500,
                    showConfirmButton: false,
                });
            }
        });
    };

    return (
        <>
            <h1>List User</h1>
            <Link to={'add'}>Add User</Link>
            <table>
                <thead>
                <tr>
                    <th>STT</th>
                    <th>Tên đăng nhập</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user, index) => (
                    <tr key={user.id}>
                        <td>{index + 1}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>
                            <Link to={`edit/${user.id}`}>Edit</Link> |
                            <button onClick={() => handleDelete(user)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}

export default UserList;