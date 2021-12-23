import React, { useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateExpense } from "../../actions/expenseActions";
import { getAccounts } from "../../actions/accountActions";
import { Formik } from "formik";
import * as yup from "yup";

const EditExpense = ({ show, handleClose, expense, socket }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAccounts());
  }, [dispatch]);
  const accountList = useSelector((state) => state.accountList);
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
        <Modal.Title>Edit Expense</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{
          date: expense.date,
          amount: expense.amount,
          description: expense.description,
          account: expense.account,
        }}
        onSubmit={(values) => {
          dispatch(updateExpense(expense._id, values));
          socket.emit("expense-updated", {
            user: user,
            amount: values.amount,
            date: values.date,
            description: values.description,
          });
          handleClose();
        }}
        validationSchema={validationSchema}
      >
        {(props) => {
          return (
            <>
              <Modal.Body>
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
                      as="textarea"
                      rows="3"
                      value={props.values.description}
                      onChange={props.handleChange("description")}
                      onBlur={() => props.handleBlur("description")}
                    />
                    {props.touched && (
                      <p className="text-danger">{props.errors.description}</p>
                    )}
                    <Form.Label>Select the account</Form.Label>
                    <Form.Select
                      aria-label="Select the account"
                      value={props.values.account._id}
                      onChange={props.handleChange("account")}
                      onBlur={() => props.handleBlur("account")}
                    >
                      <option
                        value={props.values.account}
                        key={props.values.account._id}
                      >
                        {props.values.account.name}
                      </option>
                      {accountList.accounts &&
                        accountList.accounts.map((account) => {
                          return (
                            account._id !== props.values.account._id && (
                              <option value={account._id} key={account._id}>
                                {account.name}
                              </option>
                            )
                          );
                        })}
                    </Form.Select>
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

export default EditExpense;
