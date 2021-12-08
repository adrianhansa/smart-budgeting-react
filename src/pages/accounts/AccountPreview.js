import React from "react";
import { Card } from "react-bootstrap";
import { deleteAccount } from "../../actions/accountActions";
import { useDispatch } from "react-redux";

const AccountPreview = ({ account }) => {
  const dispatch = useDispatch();
  return (
    <Card style={{ width: "18rem" }} className="mb-2">
      <Card.Body>
        <Card.Title>{account.name}</Card.Title>
        <Card.Text>{account.household.name}</Card.Text>
        <Card.Link
          type="button"
          onClick={() => dispatch(deleteAccount(account.slug))}
        >
          Delete
        </Card.Link>
        <Card.Link href="#">Edit</Card.Link>
      </Card.Body>
    </Card>
  );
};

export default AccountPreview;
