import React from "react";
import { Card } from "react-bootstrap";
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
    <>
      <Card style={{ width: "18rem" }} className="mb-2">
        <Card.Body>
          <Card.Title>User {user.name}</Card.Title>
          <Card.Text>{user.household.name}</Card.Text>
          <Card.Text>{user.email}</Card.Text>
          <Card.Link type="button" onClick={handleDelete}>
            Delete User
          </Card.Link>
        </Card.Body>
      </Card>
    </>
  );
};

export default UserPreview;
