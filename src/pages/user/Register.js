import React, { useEffect } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { register } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";

const validationSchema = yup.object({
  name: yup.string().required("Please enter your name."),
  email: yup.string().required("Please enter your email."),
  password: yup.string().required("Please enter your password."),
  passwordVerify: yup.string().required("Please re-enter your password."),
});

const Register = ({ history }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("auth"));
  useEffect(() => {
    if (user) {
      history.push("/");
    }
  }, [history, user]);
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
          dispatch(register(values));
          //   history.push("/");
          console.log(values);
        }}
        validationSchema={validationSchema}
      >
        {(props) => {
          return (
            <>
              <input
                type="email"
                value={props.values.email}
                onChange={props.handleChange("email")}
                onBlur={props.handleBlur("email")}
              />
              {props.touched && <p>{props.errors.email}</p>}
              <input
                type="text"
                value={props.values.name}
                onChange={props.handleChange("name")}
                onBlur={props.handleBlur("name")}
              />
              {props.touched && <p>{props.errors.name}</p>}
              <input
                type="password"
                value={props.values.password}
                onChange={props.handleChange("password")}
                onBlur={props.handleBlur("password")}
              />
              {props.touched && <p>{props.errors.password}</p>}
              <input
                type="password"
                value={props.values.passwordVerify}
                onChange={props.handleChange("passwordVerify")}
                onBlur={props.handleBlur("passwordVerify")}
              />
              {props.touched && <p>{props.errors.password}</p>}
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