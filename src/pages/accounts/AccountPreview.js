import React, { useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { FcMoneyTransfer } from "react-icons/fc";
import { RiDeleteBin5Line } from "react-icons/ri";
import { deleteAccount } from "../../actions/accountActions";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import EditAccount from "./EditAccount";
import AddBudgetLimit from "../budget/AddBudgetLimit";

const AccountPreview = ({ account }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const handleCloseEditModal = () => setShowEditModal(false);

  const [showAddBudgetLimitModal, setShowAddBudgetLimitModal] = useState(false);
  const handleCloseBudgetLimitModal = () => setShowAddBudgetLimitModal(false);

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
        dispatch(deleteAccount(account.slug));
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
      <tr>
        <td>{account.name}</td>
        <td>
          <BiEditAlt type="button" onClick={() => setShowEditModal(true)} />
        </td>
        <td>
          <FcMoneyTransfer
            type="button"
            onClick={() => setShowAddBudgetLimitModal(true)}
          />
        </td>
        <td>
          <RiDeleteBin5Line type="button" onClick={handleDelete} />
        </td>
      </tr>
      <EditAccount
        show={showEditModal}
        handleClose={handleCloseEditModal}
        account={account}
      />
      <AddBudgetLimit
        account={account}
        show={showAddBudgetLimitModal}
        handleClose={handleCloseBudgetLimitModal}
      />
    </>
  );
};

export default AccountPreview;
