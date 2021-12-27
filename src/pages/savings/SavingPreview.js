import React, { useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { deleteSaving } from "../../actions/savingActions";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import EditSaving from "./EditSaving";

const SavingPreview = ({ saving, handleClose, socket }) => {
  const { user } = useSelector((state) => state.auth);
  const [showEditModal, setShowSavingModal] = useState(false);
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
        dispatch(deleteSaving(saving._id));
        socket.emit("saving-deleted", {
          user: user,
          expense: saving.description,
          amount: saving.amount,
          month: saving.month,
          year: saving.year,
        });
        handleClose();
        Swal.fire({
          position: "bottom-right",
          icon: "success",
          title: "The saving has been deleted.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  const dispatch = useDispatch();
  return (
    <>
      <td>
        {saving.month}-{saving.year}
      </td>
      <td>{saving.user.name}</td>
      <td>£ {saving.amount.toFixed(2)}</td>
      <td>
        <BiEditAlt type="button" onClick={() => setShowSavingModal(true)} />
      </td>
      <td>
        <RiDeleteBin5Line type="button" onClick={handleDelete} />
      </td>
      <EditSaving
        show={showEditModal}
        handleClose={handleClose}
        saving={saving}
        socket={socket}
      />
    </>
  );
};

export default SavingPreview;
