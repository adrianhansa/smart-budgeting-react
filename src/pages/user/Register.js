import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { register } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";

const Register = () => {
  const dispatch = useDispatch();
  const validationSchema = yup.object({
    name: yup.string().required("Please enter your name."),
    email: yup.string().required("Please enter your email."),
    password: yup.string().required("Please enter your password."),
    passwordVerify: yup.string().required("Please re-enter your password."),
  });
  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          passwordVerify: "",
        }}
        onSubmit={(values) => {
          console.log(1);
        }}
        validationSchema={validationSchema}
      >
        {(props) => {
          return (
            <>
              <input
                type="text"
                value={props.values.name}
                onChange={props.handleChange("name")}
                onBlur={props.handleBlur("name")}
              />
              {props.touched && <p>{props.errors.name}</p>}
              <button type="button" onClick={props.handleSubmit}>
                Register
              </button>
            </>
          );
        }}
      </Formik>
    </div>
  );
};

export default Register;
