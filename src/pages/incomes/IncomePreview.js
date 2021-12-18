import React, { useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { deleteIncome } from "../../actions/incomeActions";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import EditIncome from "./EditIncome";

const IncomePreview = ({ income, handleClose }) => {
  const [showEditModal, setShowEditModal] = useState(false);
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
        dispatch(deleteIncome(income._id));
        handleClose();
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
        <td>{income.date}</td>
        <td>{income.user.name}</td>
        <td>£ {income.amount.toFixed(2)}</td>
        <td>{income.description}</td>
        <td>
          <BiEditAlt type="button" onClick={() => setShowEditModal(true)} />
        </td>
        <td>
          <RiDeleteBin5Line type="button" onClick={handleDelete} />
        </td>
      </tr>
      <EditIncome
        show={showEditModal}
        handleClose={handleClose}
        income={income}
      />
    </>
  );
};

export default IncomePreview;