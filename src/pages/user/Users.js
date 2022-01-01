import React, { useEffect, useState } from "react";
import { Row, Col, Container, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../../actions/userActions";
import { GrAddCircle } from "react-icons/gr";
import AddUser from "./AddUser";
import UserPreview from "./UserPreview";

const Users = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.userList);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  return (
    <Container fluid>
      <Row>
        <Col>
          <h2 className="text-center">
            Users
            {user.isAdmin && (
              <GrAddCircle
                size="32"
                type="button"
                onClick={() => setShow(true)}
              />
            )}
          </h2>
          <AddUser show={show} handleClose={handleClose} />

          <Row className="mt-3">
            <Col xs={12} sm={10} md={8} lg={6} xl={6} className="mx-auto">
              {loading && <p>Loading...</p>}
              {error && <p>{error}</p>}
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th width="35%">Name</th>
                    <th width="35%">Email address</th>
                    <th width="10%">Is Admin</th>
                    <th width="10%">Edit</th>
                    <th width="10%">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {users &&
                    users.map((item) => {
                      return <UserPreview user={item} key={item._id} />;
                    })}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Users;
