import React, { useEffect } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { register } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Col, Row, Container, Button, Card } from "react-bootstrap";

const validationSchema = yup.object({
  name: yup.string().required("Please enter your name."),
  household: yup.string().required("Please enter a name for your household."),
  email: yup.string().required("Please enter your email."),
  password: yup.string().required("Please enter your password."),
  passwordVerify: yup.string().required("Please re-enter your password."),
});

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user, error } = useSelector((state) => state.auth);
  useEffect(() => {
    if (user) {
      navigate("/welcome");
    }
  }, [navigate, user]);
  return (
    <Container fluid>
      <Row className="mt-3">
        <Col className="mx-auto" xs={12} sm={8} md={6} lg={3} xl={3}>
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          <Card>
            <Card.Header>
              <h3 className="text-center">Register</h3>
            </Card.Header>
            <Formik
              initialValues={{
                name: "",
                household: "",
                email: "",
                password: "",
                passwordVerify: "",
              }}
              onSubmit={(values) => {
                dispatch(register(values));
              }}
              validationSchema={validationSchema}
            >
              {(props) => {
                return (
                  <Card.Body>
                    <Form>
                      <Form.Group className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                          type="email"
                          value={props.values.email}
                          onChange={props.handleChange("email")}
                          onBlur={props.handleBlur("email")}
                          placeholder="Email"
                        />
                        {props.touched && <p>{props.errors.email}</p>}
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          value={props.values.name}
                          onChange={props.handleChange("name")}
                          onBlur={props.handleBlur("name")}
                          placeholder="Name"
                        />
                        {props.touched && <p>{props.errors.name}</p>}
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Household</Form.Label>
                        <Form.Control
                          type="text"
                          value={props.values.household}
                          onChange={props.handleChange("household")}
                          onBlur={props.handleBlur("household")}
                          placeholder="household"
                        />
                        {props.touched && <p>{props.errors.household}</p>}
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          value={props.values.password}
                          onChange={props.handleChange("password")}
                          onBlur={props.handleBlur("password")}
                          placeholder="Password"
                        />
                        {props.touched && <p>{props.errors.password}</p>}
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Re-type Password</Form.Label>
                        <Form.Control
                          type="password"
                          value={props.values.passwordVerify}
                          onChange={props.handleChange("passwordVerify")}
                          onBlur={props.handleBlur("passwordVerify")}
                          placeholder="Verify password"
                        />
                        {props.touched && <p>{props.errors.password}</p>}
                      </Form.Group>

                      <Button
                        type="submit"
                        size="lg"
                        onClick={props.handleSubmit}
                      >
                        Register
                      </Button>
                    </Form>
                  </Card.Body>
                );
              }}
            </Formik>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
