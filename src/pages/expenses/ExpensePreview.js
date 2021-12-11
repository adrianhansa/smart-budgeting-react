import React, { useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { deleteExpense } from "../../actions/expenseActions";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import EditExpense from "./EditExpense";

const AccountPreview = ({ expense }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const handleCloseEditModal = () => setShowEditModal(false);
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
        dispatch(deleteExpense(expense._id));
        document.location.reload();
        Swal.fire({
          position: "bottom-right",
          icon: "success",
          title: "The expense has been deleted.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  const dispatch = useDispatch();
  return (
    <>
      <tr>
        <td>{expense.date}</td>
        <td>{expense.amount}</td>
        <td>{expense.description}</td>
        <td>{expense.account.name}</td>
        <td>
          <BiEditAlt type="button" onClick={() => setShowEditModal(true)} />
        </td>
        <td>
          <RiDeleteBin5Line type="button" onClick={handleDelete} />
        </td>
      </tr>
      <EditExpense
        show={showEditModal}
        handleClose={handleCloseEditModal}
        expense={expense}
      />
    </>
  );
};

export default AccountPreview;
