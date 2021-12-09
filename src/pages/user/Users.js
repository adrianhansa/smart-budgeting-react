import React, { useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../../actions/userActions";
import UserPreview from "./UserPreview";

const Users = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.userList);
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  return (
    <Container fluid>
      <Row>
        <Col>
          {loading && <p className="info">Loading...</p>}
          {error && <p className="danger">{error}</p>}
          {users && users.length > 0 ? (
            users.map((user) => {
              return (
                <Col xs={12} sm={6} md={4} lg={3} xl={2} key={user._id}>
                  <UserPreview user={user} />
                </Col>
              );
            })
          ) : (
            <p>No users</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Users;
