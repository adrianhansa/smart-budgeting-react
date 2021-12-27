import React, { useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { deleteAccount } from "../../actions/accountActions";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import EditAccount from "./EditAccount";

const AccountPreview = ({ account }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const handleCloseEditModal = () => setShowEditModal(false);
  const { user } = useSelector((state) => state.auth);
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
        dispatch(deleteAccount(account._id));
        Swal.fire({
          position: "bottom-right",
          icon: "success",
          title: "The account has been deleted.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  const dispatch = useDispatch();
  return (
    <>
      <td>{account.name}</td>
      <td>{account.budget}</td>
      {user.isAdmin && (
        <>
          <td>
            <BiEditAlt type="button" onClick={() => setShowEditModal(true)} />
          </td>
          <td>
            <RiDeleteBin5Line type="button" onClick={handleDelete} />
          </td>
        </>
      )}
      <EditAccount
        show={showEditModal}
        handleClose={handleCloseEditModal}
        account={account}
      />
    </>
  );
};

export default AccountPreview;
