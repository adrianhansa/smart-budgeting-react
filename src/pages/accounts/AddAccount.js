import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addAccount } from "../../actions/accountActions";
import { Formik } from "formik";
import * as yup from "yup";
import { useSelector } from "react-redux";
import Loading from "../../components/Loading";

const AddAccount = ({ show, handleClose }) => {
  const { loading, error } = useSelector((state) => state.accountDetails);
  const dispatch = useDispatch();
  const validationSchema = yup.object({
    name: yup.string().required("Please enter a name for your account."),
    budget: yup.number(),
  });
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add a New Account</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{ name: "", budget: 0.0 }}
        onSubmit={(values) => {
          dispatch(addAccount(values));
          handleClose();
        }}
        validationSchema={validationSchema}
      >
        {(props) => {
          return (
            <>
              <Modal.Body>
                {loading && <Loading />}
                {error && <p className="text-danger">{error}</p>}
                <Form>
                  <Form.Group className="mb-3">
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
                    <Form.Label>Set a budget limit</Form.Label>
                    <Form.Control
                      type="number"
                      value={props.values.budget}
                      onChange={props.handleChange("budget")}
                      onBlur={() => props.handleBlur("budget")}
                    />
                    {props.touched && (
                      <p className="text-danger">{props.errors.budget}</p>
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

export default AddAccount;
