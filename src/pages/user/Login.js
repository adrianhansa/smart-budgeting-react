import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userActions";
import * as yup from "yup";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  email: yup.string().required("Please enter your email address."),
  password: yup.string().required("Please enter your password"),
});

const Login = () => {
  const { user, error, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);
  const dispatch = useDispatch();
  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <Formik
        validationSchema={validationSchema}
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          dispatch(login(values));
        }}
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
                type="password"
                value={props.values.password}
                onChange={props.handleChange("password")}
                onBlur={props.handleBlur("password")}
                placeholder="Password"
              />
              {props.touched && <p>{props.errors.password}</p>}
              <button type="submit" onClick={props.handleSubmit}>
                Login
              </button>
            </>
          );
        }}
      </Formik>
    </div>
  );
};

export default Login;
