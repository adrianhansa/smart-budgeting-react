import React from "react";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { deleteUser } from "../../actions/userActions";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

const UserPreview = ({ user }) => {
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUser(user._id));
        Swal.fire({
          position: "bottom-right",
          icon: "success",
          title: "The user account has been deleted.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  const dispatch = useDispatch();
  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>
        <BiEditAlt type="button" onClick={() => console.log("Edit user")} />
      </td>
      <td>
        <RiDeleteBin5Line type="button" onClick={handleDelete} />
      </td>
    </tr>
  );
};

export default UserPreview;
