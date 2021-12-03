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
      const { data } = await axios.post(`http://localhost:5000/register`, {
        email,
        password,
        passwordVerify,
        name,
        household,
      });
      dispatch({ type: REGISTER_SUCCESS, payload: data });
      localStorage.setItem("auth", JSON.stringify({ user: data }));
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
    try {
      dispatch({ type: LOGIN_REQUEST });
      const { data } = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      dispatch({ type: LOGIN_SUCCESS, payload: data });
      localStorage.setItem("auth", JSON.stringify({ user: data }));
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
  dispatch({ type: LOGOUT });
  localStorage.removeItem("auth");
};
