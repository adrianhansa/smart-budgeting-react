import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);
  useEffect(() => {
    !user && navigate("/login");
  });
  return (
    <Container fluid>
      <Row>
        <Col>
          {error && <p className="text-danger">{error}</p>}
          {loading && <Loading />}
          <h3>Welcome</h3>
        </Col>
      </Row>
    </Container>
  );
};

export default Welcome;
