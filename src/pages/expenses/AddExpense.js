import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addExpense } from "../../actions/expenseActions";
import { Formik } from "formik";
import * as yup from "yup";
import { useSelector } from "react-redux";

const AddExpense = ({ show, handleClose }) => {
  const { loading, error } = useSelector((state) => state.expenseDetails);
  const dispatch = useDispatch();
  const validationSchema = yup.object({
    date: yup
      .string()
      .required("Please select the date when the expense took place."),
    amount: yup.number().required("Please enter the amount you spent."),
    description: yup.string().required("What have you purchased ?"),
    account: yup.string().required("Please select the account"),
  });
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add a New Expense</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{
          date: new Date(),
          amount: 0.0,
          description: "",
          account: "",
        }}
        onSubmit={(values) => {
          dispatch(addExpense(values));
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
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={props.values.date}
                      onChange={props.handleChange("date")}
                      onBlur={() => props.handleBlur("date")}
                    />
                    {props.touched && (
                      <p className="text-danger">{props.errors.date}</p>
                    )}
                    <Form.Label>Amount spent</Form.Label>
                    <Form.Control
                      type="number"
                      value={props.values.amount}
                      onChange={props.handleChange("amount")}
                      onBlur={() => props.handleBlur("amount")}
                    />
                    {props.touched && (
                      <p className="text-danger">{props.errors.amount}</p>
                    )}
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="text"
                      value={props.values.description}
                      onChange={props.handleChange("description")}
                      onBlur={() => props.handleBlur("description")}
                    />
                    {props.touched && (
                      <p className="text-danger">{props.errors.description}</p>
                    )}
                    <Form.Label>Select the account</Form.Label>
                    <Form.Control
                      type="text"
                      value={props.values.account}
                      onChange={props.handleChange("account")}
                      onBlur={() => props.handleBlur("account")}
                    />
                    {props.touched && (
                      <p className="text-danger">{props.errors.account}</p>
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

export default AddExpense;
