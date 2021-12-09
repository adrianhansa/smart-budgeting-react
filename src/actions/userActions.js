import axios from "axios";
import {
  ADD_USER_FAIL,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
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
  await axios.get("http://localhost:5000/logout");
  localStorage.removeItem("auth");
};

export const addUser =
  ({ name, email, password, passwordVerify }) =>
  async (dispatch) => {
    try {
      dispatch({ type: ADD_USER_REQUEST });
      const { data } = await axios.post("http://localhost:5000/add-user", {
        name,
        email,
        password,
        passwordVerify,
      });
      dispatch({ type: ADD_USER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ADD_USER_FAIL,
        error:
          error.response.data.message && error.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });
    const { data } = await axios.delete(
      `http://localhost:5000/delete-user/${id}`
    );
    dispatch({ type: DELETE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      error:
        error.response.data.message && error.message
          ? error.response.data.message
          : error.message,
    });
  }
};
