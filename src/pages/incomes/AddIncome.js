import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addIncome } from "../../actions/incomeActions";
import { Formik } from "formik";
import * as yup from "yup";
import Loading from "../../components/Loading";

const AddIncome = ({ show, handleClose }) => {
  const { user } = useSelector((state) => state.auth);
  const { loading, error } = useSelector((state) => state.incomeDetails);
  const dispatch = useDispatch();
  const validationSchema = yup.object({
    date: yup
      .string()
      .required("Please select the date when you've been paid."),
    amount: yup.number().required("Please enter the amount you earned."),
    description: yup.string().required("Source of the income ?"),
  });
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Record a New Income</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{
          date: new Date(),
          amount: 0.0,
          description: "",
        }}
        onSubmit={(values) => {
          dispatch(addIncome(values));
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
                    <Form.Label>Amount earned</Form.Label>
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
                      rows="2"
                      value={props.values.description}
                      onChange={props.handleChange("description")}
                      onBlur={() => props.handleBlur("description")}
                    />
                    {props.touched && (
                      <p className="text-danger">{props.errors.description}</p>
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

export default AddIncome;
