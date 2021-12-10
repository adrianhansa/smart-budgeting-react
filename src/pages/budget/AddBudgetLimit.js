import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addBudgetLimit } from "../../actions/budgetLimitActions";
import { Formik } from "formik";
import * as yup from "yup";

const AddBudgetLimit = ({ show, handleClose, account }) => {
  const currentMonthAndYear = `${new Date().getFullYear()}-${
    new Date().getMonth() + 1
  }}`;
  const dispatch = useDispatch();
  const validationSchema = yup.object({
    limit: yup
      .number()
      .required(`Please enter spending limit for ${account.name}.`),
    date: yup.string().required(`Please select a month and a year.`),
  });
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Set the spending limit for {account.name}</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{ limit: "", date: currentMonthAndYear }}
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
                      type="month"
                      value={props.values.date}
                      onChange={props.handleChange("date")}
                      onBlur={() => props.handleBlur("date")}
                    />
                    {props.touched && (
                      <p className="text-danger">{props.errors.date}</p>
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
