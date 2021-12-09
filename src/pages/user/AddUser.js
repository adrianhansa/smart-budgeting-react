import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { addUser } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  name: yup.string().required("Please enter the new user name."),
  email: yup.string().required("Please enter the new user email address."),
  password: yup.string().required("Please enter the new user password."),
  passwordVerify: yup
    .string()
    .required("Please re-enter the new user password."),
});

const AddUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.addedUser);
  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          passwordVerify: "",
        }}
        onSubmit={(values) => {
          dispatch(addUser(values));
          navigate("/users");
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
                Add User
              </button>
            </>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddUser;
