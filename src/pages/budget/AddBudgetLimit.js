import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addBudgetLimit } from "../../actions/budgetLimitActions";
import { Formik } from "formik";
import * as yup from "yup";

const AddBudgetLimit = ({ show, handleClose, account }) => {
  const dispatch = useDispatch();
  const validationSchema = yup.object({
    limit: yup
      .number()
      .required(`Please enter spending limit for ${account.name}.`),
    month: yup.string().required(`Please select a month.`),
    year: yup.string().required(`Please select a year.`),
  });
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Set the spending limit for {account.name}</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{ limit: "", month: "", year: "" }}
        onSubmit={(values) => {
          dispatch(addBudgetLimit(account._id, values));
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
                    <Form.Label>Limit:</Form.Label>
                    <Form.Control
                      type="number"
                      value={props.values.limit}
                      onChange={props.handleChange("limit")}
                      onBlur={() => props.handleBlur("limit")}
                    />
                    {props.touched && (
                      <p className="text-danger">{props.errors.limit}</p>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Month:</Form.Label>
                    <Form.Control
                      type="text"
                      value={props.values.month}
                      onChange={props.handleChange("month")}
                      onBlur={() => props.handleBlur("month")}
                    />
                    {props.touched && (
                      <p className="text-danger">{props.errors.month}</p>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Year:</Form.Label>
                    <Form.Control
                      type="text"
                      value={props.values.year}
                      onChange={props.handleChange("year")}
                      onBlur={() => props.handleBlur("year")}
                    />
                    {props.touched && (
                      <p className="text-danger">{props.errors.year}</p>
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

export default AddBudgetLimit;
