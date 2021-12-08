import React from "react";
import { Card } from "react-bootstrap";
import { deleteAccount } from "../../actions/accountActions";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

const AccountPreview = ({ account }) => {
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
    <Card style={{ width: "18rem" }} className="mb-2">
      <Card.Body>
        <Card.Title>{account.name}</Card.Title>
        <Card.Text>{account.household.name}</Card.Text>
        <Card.Link type="button" onClick={handleDelete}>
          Delete
        </Card.Link>
        <Card.Link href="#">Edit</Card.Link>
      </Card.Body>
    </Card>
  );
};

export default AccountPreview;
