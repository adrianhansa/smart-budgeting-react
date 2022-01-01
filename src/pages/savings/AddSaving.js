import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addSaving } from "../../actions/savingActions";
import { Formik } from "formik";
import * as yup from "yup";
import Loading from "../../components/Loading";

const AddSaving = ({ show, handleClose }) => {
  const { loading, error } = useSelector((state) => state.savingDetails);
  const dispatch = useDispatch();

  const validationSchema = yup.object({
    date: yup
      .string()
      .required("Please select the date when you've been paid."),
    amount: yup.number().required("Please enter the amount you earned."),
  });
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Record a Saving</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{
          date: new Date(),
          amount: 0.0,
        }}
        onSubmit={(values) => {
          console.log(values.date);
          dispatch(
            addSaving({
              amount: values.amount,
              month: values.date.split("-")[1],
              year: values.date.split("-")[0],
            })
          );
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
                      type="month"
                      value={props.values.date}
                      onChange={props.handleChange("date")}
                      onBlur={() => props.handleBlur("date")}
                    />
                    {props.touched && (
                      <p className="text-danger">{props.errors.date}</p>
                    )}
                    <Form.Label>Amount saved</Form.Label>
                    <Form.Control
                      type="number"
                      value={props.values.amount}
                      onChange={props.handleChange("amount")}
                      onBlur={() => props.handleBlur("amount")}
                    />
                    {props.touched && (
                      <p className="text-danger">{props.errors.amount}</p>
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

export default AddSaving;
