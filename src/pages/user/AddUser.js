import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import { addUser } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";

const validationSchema = yup.object({
  name: yup.string().required("Please enter the new user name."),
  email: yup.string().required("Please enter the new user email address."),
  password: yup.string().required("Please enter the new user password."),
  passwordVerify: yup
    .string()
    .required("Please re-enter the new user password."),
});

const AddUser = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.addedUser);
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add a New User</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          passwordVerify: "",
        }}
        onSubmit={(values) => {
          dispatch(addUser(values));
          handleClose();
        }}
        validationSchema={validationSchema}
      >
        {(props) => {
          return (
            <>
              <Modal.Body>
                {loading && <p>Loading...</p>}
                {error && <p className="text-danger">{error}</p>}
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
                    {props.touched && (
                      <p className="text-danger">{props.errors.email}</p>
                    )}
                    <Form.Label>User name</Form.Label>
                    <Form.Control
                      type="text"
                      value={props.values.name}
                      onChange={props.handleChange("name")}
                      onBlur={props.handleBlur("name")}
                      placeholder="Name"
                    />
                    {props.touched && (
                      <p className="text-danger">{props.errors.name}</p>
                    )}
                    <Form.Label>User's password</Form.Label>
                    <Form.Control
                      type="password"
                      value={props.values.password}
                      onChange={props.handleChange("password")}
                      onBlur={props.handleBlur("password")}
                      placeholder="Password"
                    />
                    {props.touched && (
                      <p className="text-danger">{props.errors.password}</p>
                    )}
                    <Form.Label>Re-enter user's password</Form.Label>
                    <Form.Control
                      type="password"
                      value={props.values.passwordVerify}
                      onChange={props.handleChange("passwordVerify")}
                      onBlur={props.handleBlur("passwordVerify")}
                      placeholder="Verify password"
                    />
                    {props.touched && (
                      <p className="text-danger">{props.errors.password}</p>
                    )}
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={props.handleSubmit}
                >
                  Add User
                </Button>
              </Modal.Footer>
            </>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default AddUser;
