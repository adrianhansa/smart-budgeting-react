import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateSaving } from "../../actions/savingActions";
import { Formik } from "formik";
import * as yup from "yup";

const EditSaving = ({ show, handleClose, saving, socket }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const validationSchema = yup.object({
    amount: yup.number().required("Please enter the amount."),
  });
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update the Income</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{
          amount: saving.amount,
        }}
        onSubmit={(values) => {
          dispatch(updateSaving(saving._id, { amount: values.amount }));
          socket.emit("saving-updated", {
            user: user,
            amount: values.amount,
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

export default EditSaving;
