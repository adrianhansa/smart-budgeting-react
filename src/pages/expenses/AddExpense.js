import React, { useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addExpense } from "../../actions/expenseActions";
import { getAccounts } from "../../actions/accountActions";
import { Formik } from "formik";
import * as yup from "yup";
import Loading from "../../components/Loading";

const AddExpense = ({ show, handleClose, socket }) => {
  const { user } = useSelector((state) => state.auth);
  const { loading, error } = useSelector((state) => state.expenseDetails);
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
          socket.emit("expense-created", {
            user,
            amount: values.amount,
            date: values.date,
            description: values.description,
            // account: values.account.name,
          });
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
                      value={props.values.account}
                      onChange={props.handleChange("account")}
                      onBlur={() => props.handleBlur("account")}
                    >
                      <option></option>
                      {accountList.accounts &&
                        accountList.accounts.map((account) => {
                          return (
                            <option value={account._id} key={account._id}>
                              {account.name}
                            </option>
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

export default AddExpense;
