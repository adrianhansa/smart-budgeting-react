import axios from "axios";
import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "../constants/userConstants";

export const register =
  ({ email, password, household, name, passwordVerify }) =>
  async (dispatch) => {
    try {
      dispatch({ type: REGISTER_REQUEST });
      const response = await axios.post(`http://localhost:5000/register`, {
        email,
        password,
        passwordVerify,
        name,
        household,
      });
      console.log(response);
      dispatch({ type: REGISTER_SUCCESS, payload: response.data });
      localStorage.setItem("auth", JSON.stringify(response.data));
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload:
          error.response.data.message && error.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const login =
  ({ email, password }) =>
  async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    const { data } = await axios.post("http://localhost:5000/login", {
      email,
      password,
    });
    dispatch({ type: LOGIN_SUCCESS, payload: data });
    localStorage.setItem("auth", JSON.stringify(data));
    try {
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload:
          error.response.data.message && error.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT, payload: null });
  localStorage.removeItem("auth");
};
