import React, { useEffect } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { register } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  name: yup.string().required("Please enter your name."),
  household: yup.string().required("Please enter a name for your household."),
  email: yup.string().required("Please enter your email."),
  password: yup.string().required("Please enter your password."),
  passwordVerify: yup.string().required("Please re-enter your password."),
});

const AddUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user, error } = useSelector((state) => state.auth);
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);
  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <Formik
        initialValues={{
          name: "",
          household: "",
          email: "",
          password: "",
          passwordVerify: "",
        }}
        onSubmit={(values) => {
          dispatch(register(values));
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
                placeholder="Email"
              />
              {props.touched && <p>{props.errors.email}</p>}
              <input
                type="text"
                value={props.values.name}
                onChange={props.handleChange("name")}
                onBlur={props.handleBlur("name")}
                placeholder="Name"
              />
              {props.touched && <p>{props.errors.name}</p>}
              <input
                type="text"
                value={props.values.household}
                onChange={props.handleChange("household")}
                onBlur={props.handleBlur("household")}
                placeholder="household"
              />
              {props.touched && <p>{props.errors.household}</p>}
              <input
                type="password"
                value={props.values.password}
                onChange={props.handleChange("password")}
                onBlur={props.handleBlur("password")}
                placeholder="Password"
              />
              {props.touched && <p>{props.errors.password}</p>}
              <input
                type="password"
                value={props.values.passwordVerify}
                onChange={props.handleChange("passwordVerify")}
                onBlur={props.handleBlur("passwordVerify")}
                placeholder="Verify password"
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

export default AddUser;
