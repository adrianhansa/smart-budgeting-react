import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateAccount } from "../../actions/accountActions";
import { Formik } from "formik";
import * as yup from "yup";

const EditAccount = ({ show, handleClose, account }) => {
  const dispatch = useDispatch();
  const validationSchema = yup.object({
    name: yup.string().required("Please enter a name for your account."),
    budget: yup.number(),
  });
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Account</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{ name: account.name, budget: account.budget }}
        onSubmit={(values) => {
          dispatch(updateAccount(account._id, values));
          handleClose();
        }}
        validationSchema={validationSchema}
      >
        {(props) => {
          return (
            <>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Account name</Form.Label>
                    <Form.Control
                      type="text"
                      value={props.values.name}
                      onChange={props.handleChange("name")}
                      onBlur={() => props.handleBlur("name")}
                    />
                    {props.touched && (
                      <p className="text-danger">{props.errors.name}</p>
                    )}
                    <Form.Label>Change the budget limit</Form.Label>
                    <Form.Control
                      type="number"
                      value={props.values.budget}
                      onChange={props.handleChange("budget")}
                      onBlur={() => props.handleBlur("budget")}
                    />
                    {props.touched && (
                      <p className="text-danger">{props.errors.limit}</p>
                    )}
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button
                  variant="success"
                  type="submit"
                  onClick={props.handleSubmit}
                >
                  Save changes
                </Button>
              </Modal.Footer>
            </>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default EditAccount;
